import { useState, useEffect, useRef } from "preact/hooks";
import { MarkdownView, Notice, requestUrl, type App, type Editor, type EditorPosition } from "obsidian";
import { PersonaProgress } from "./PersonaProgress";
import { ResultsSummary } from "./ResultsSummary";
import { RevisionNotes } from "./RevisionNotes";
import { validateInput, runPipeline } from "../core/pipeline.js";
import { createClient, setHttpFunction } from "../core/llm-client.js";
import { createVaultHistory, contentHash } from "../core/history.js";
import { diffFindings } from "../core/differ.js";
import { interpretRevision } from "../core/interpreter.js";
import type { FirstMisreadSettings } from "../settings";

setHttpFunction(requestUrl);

type Status = "idle" | "analyzing" | "complete" | "error";

interface PersonaState {
  name: string;
  status: string;
  findingCount: number;
}

interface Props {
  app: App;
  settings: FirstMisreadSettings;
}

function stripFrontmatter(text: string): string {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return match ? text.slice(match[0].length) : text;
}

function highlightInEditor(editor: Editor, passage: string): boolean {
  const lineCount = editor.lineCount();
  const lines: string[] = [];
  const lineStartOffsets: number[] = [];
  let running = 0;
  for (let i = 0; i < lineCount; i++) {
    const line = editor.getLine(i);
    lineStartOffsets.push(running);
    lines.push(line);
    running += line.length + 1;
  }
  const fullText = lines.join("\n");
  const idx = fullText.indexOf(passage);
  if (idx === -1) return false;

  const offsetToPos = (offset: number): EditorPosition => {
    for (let i = lineStartOffsets.length - 1; i >= 0; i--) {
      if (offset >= lineStartOffsets[i]) {
        return { line: i, ch: offset - lineStartOffsets[i] };
      }
    }
    return { line: 0, ch: 0 };
  };

  const from = offsetToPos(idx);
  const to = offsetToPos(idx + passage.length);
  editor.setSelection(from, to);
  editor.scrollIntoView({ from, to }, true);
  return true;
}

function highlightInReadingMode(contentEl: HTMLElement, passage: string): boolean {
  contentEl.querySelectorAll("mark.fm-passage-highlight").forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
      parent.normalize();
    }
  });

  const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  const offsets: number[] = [];
  let total = 0;
  let node: Node | null;
  while ((node = walker.nextNode())) {
    offsets.push(total);
    nodes.push(node as Text);
    total += (node as Text).length;
  }

  const fullText = nodes.map((n) => n.textContent).join("");
  const idx = fullText.indexOf(passage);
  if (idx === -1) return false;

  const findNodeAndOffset = (flatOffset: number): [Text, number] => {
    for (let i = nodes.length - 1; i >= 0; i--) {
      if (flatOffset >= offsets[i]) {
        return [nodes[i], flatOffset - offsets[i]];
      }
    }
    return [nodes[0], 0];
  };

  const [startNode, startOffset] = findNodeAndOffset(idx);
  const [endNode, endOffset] = findNodeAndOffset(idx + passage.length);

  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);

  try {
    const mark = document.createElement("mark");
    mark.className = "fm-passage-highlight";
    range.surroundContents(mark);
    mark.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch {
    startNode.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return true;
}

export function Analyzer({ app, settings }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [personas, setPersonas] = useState<PersonaState[]>([]);
  const [result, setResult] = useState<any>(null);
  const [revisionNotes, setRevisionNotes] = useState<any>(null);
  const [diffs, setDiffs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const analyzedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const ref = app.workspace.on("active-leaf-change", () => {
      const currentFile = app.workspace.getActiveFile();
      const currentPath = currentFile?.path ?? null;
      if (currentPath !== analyzedPathRef.current) {
        setStatus("idle");
        setPersonas([]);
        setResult(null);
        setRevisionNotes(null);
        setDiffs([]);
        setError(null);
      }
    });
    return () => app.workspace.offref(ref);
  }, [app]);

  const highlightPassage = (passage: string) => {
    const view = app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice("Open the note to highlight passages.");
      return;
    }
    const editor = view.editor;
    if (editor) {
      if (!highlightInEditor(editor, passage)) {
        new Notice("Passage not found — the note may have been edited since analysis.");
      }
    } else {
      if (!highlightInReadingMode(view.contentEl, passage)) {
        new Notice("Passage not found — the note may have been edited since analysis.");
      }
    }
  };

  const analyze = async () => {
    const file = app.workspace.getActiveFile();
    if (!file) {
      new Notice("No active note to analyze");
      return;
    }

    if (!settings.apiKey) {
      new Notice("Set your API key in First Misread settings");
      return;
    }

    setStatus("analyzing");
    setError(null);
    setResult(null);
    setRevisionNotes(null);
    setDiffs([]);
    setPersonas([]);
    analyzedPathRef.current = file.path;

    try {
      const raw = await app.vault.read(file);
      const text = stripFrontmatter(raw);
      validateInput(text);

      const client = createClient(settings.provider, {
        apiKey: settings.apiKey,
        model: settings.model,
        baseUrl: settings.baseUrl || undefined,
      });

      const onProgress = (msg: any) => {
        switch (msg.type) {
          case "personas-selected":
            setPersonas(
              msg.personas.map((name: string) => ({
                name,
                status: "waiting",
                findingCount: 0,
              }))
            );
            break;
          case "persona-started":
            setPersonas((prev) =>
              prev.map((p) =>
                p.name === msg.persona ? { ...p, status: "reading" } : p
              )
            );
            break;
          case "persona-done":
            setPersonas((prev) =>
              prev.map((p) =>
                p.name === msg.persona
                  ? { ...p, status: "done", findingCount: msg.findingCount }
                  : p
              )
            );
            break;
        }
      };

      const pipelineResult = await runPipeline(client, text, onProgress);
      setResult(pipelineResult);

      const contentId = file.path.replace(/\.md$/, "");
      const history = createVaultHistory(
        app.vault.adapter,
        settings.resultsFolder
      );

      const chain = await history.loadChain(contentId);
      const parentHasFindings = chain.length > 0 &&
        chain[chain.length - 1].findings?.length > 0;
      let parentInput: string | null = null;

      if (parentHasFindings) {
        const parentRunId = chain[chain.length - 1].run_id;
        parentInput = await history.loadInput(contentId, parentRunId);

        const findingDiffs = diffFindings(
          pipelineResult.aggregatedFindings,
          chain
        );
        setDiffs(findingDiffs);

        let textDiff = "";
        if (parentInput) {
          textDiff = `--- previous\n+++ current\n(text changed)`;
        }

        const notes = await interpretRevision(
          client,
          findingDiffs,
          textDiff,
          chain
        );
        setRevisionNotes(notes);
      }

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "")
        .slice(0, 15);
      const runId = `run-${timestamp}`;
      const hash = await contentHash(text);

      const runRecord = {
        run_id: runId,
        timestamp: new Date().toISOString(),
        slug: contentId.split("/").pop() || contentId,
        content_hash: hash,
        word_count: pipelineResult.metadata.wordCount,
        model: settings.model,
        personas_run: pipelineResult.personas.map((p: any) => p.name),
        parent_run_id:
          chain.length > 0 ? chain[chain.length - 1].run_id : null,
        metadata: pipelineResult.metadata,
        findings: pipelineResult.aggregatedFindings,
        persona_verdicts: pipelineResult.personaResults.map((r: any) => ({
          persona: r.persona,
          verdict: r.overall_verdict || "",
          key_issue:
            r.findings.length > 0 ? r.findings[0].what_happened : "none",
        })),
      };

      if (pipelineResult.personaResults.length > 0) {
        await history.saveRun(contentId, runRecord, text);
      }

      setStatus("complete");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStatus("error");
    }
  };

  return (
    <div class="fm-analyzer">
      {status === "idle" && (
        <div class="fm-idle">
          <p class="fm-hint">Open a note and click Analyze to begin.</p>
          <button class="mod-cta" onClick={analyze}>
            Analyze Active Note
          </button>
        </div>
      )}

      {status === "analyzing" && (
        <div class="fm-analyzing">
          <p>Analyzing...</p>
          {personas.length > 0 && <PersonaProgress personas={personas} />}
        </div>
      )}

      {status === "complete" && result && (
        <div class="fm-complete">
          {diffs.length > 0 && revisionNotes && (
            <RevisionNotes notes={revisionNotes} diffs={diffs} />
          )}
          <ResultsSummary
            aggregatedFindings={result.aggregatedFindings}
            personaResults={result.personaResults}
            strengths={result.strengths}
            onHighlight={highlightPassage}
          />
          <button class="fm-btn-secondary" onClick={() => { setStatus("idle"); analyzedPathRef.current = null; }}>
            Analyze Again
          </button>
        </div>
      )}

      {status === "error" && (
        <div class="fm-error">
          <p class="fm-error-text">{error}</p>
          <button class="fm-btn-secondary" onClick={() => { setStatus("idle"); analyzedPathRef.current = null; }}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
