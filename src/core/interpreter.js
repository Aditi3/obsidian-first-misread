const INTERPRETER_SYSTEM_PROMPT = `You are an editorial advisor reviewing successive drafts of the same piece. You have the full history of reader-simulation feedback across all versions. Your job is to tell the author what their revision pattern reveals — not to repeat what the personas already said, but to synthesize across runs.

Return your analysis as JSON with this exact structure:
{
  "what_landed": ["list of fixes that worked and why"],
  "what_persists": ["issues that remain, with pattern diagnosis"],
  "what_regressed": ["things that got worse"],
  "revision_pattern": "one-paragraph meta-observation about how the author revises",
  "suggestion": "one concrete next-move recommendation"
}

Be direct. Be specific. Reference actual passages and persona names. Don't repeat what the finding diffs already say — interpret them.`;

export function formatChainSummary(chain) {
  if (!chain || chain.length === 0) return "";
  return chain
    .map((record, i) => {
      const version = `v${i + 1}`;
      const findingCount = record.findings.length;
      const top = record.findings
        .slice(0, 3)
        .map((f) => f.passage.slice(0, 60))
        .join("; ");
      return `- ${record.run_id} (${version}): ${findingCount} findings. Top: ${top || "none"}`;
    })
    .join("\n");
}

export function buildInterpreterPrompt(diffs, textDiff, chainSummary) {
  const sections = [];

  if (chainSummary) {
    sections.push(`## Chain History\n\n${chainSummary}`);
  }

  const diffLines = diffs.map((d) => {
    const status = d.status.toUpperCase();
    let passage = "(unknown)";
    if (d.current_finding) {
      passage = d.current_finding.passage.slice(0, 100);
    } else if (d.parent_finding) {
      passage = d.parent_finding.passage.slice(0, 100);
    }

    let line = `- [${status}] "${passage}"`;
    if (d.severity_change) {
      line += ` (severity ${d.severity_change})`;
    }
    if (d.persona_count_change && d.persona_count_change !== 0) {
      const sign = d.persona_count_change > 0 ? "+" : "";
      line += ` (${sign}${d.persona_count_change} personas)`;
    }
    if (d.run_streak > 1) {
      line += ` (streak: ${d.run_streak} consecutive runs)`;
    }
    return line;
  });

  sections.push("## Finding Diffs\n\n" + diffLines.join("\n"));

  if (textDiff) {
    sections.push(`## Content Diff\n\n\`\`\`diff\n${textDiff}\n\`\`\``);
  }

  return sections.join("\n\n");
}

export function parseRevisionNotes(data) {
  if (!data) return null;
  const required = [
    "what_landed",
    "what_persists",
    "what_regressed",
    "revision_pattern",
    "suggestion",
  ];
  for (const key of required) {
    if (!(key in data)) return null;
  }
  return {
    what_landed: data.what_landed,
    what_persists: data.what_persists,
    what_regressed: data.what_regressed,
    revision_pattern: data.revision_pattern,
    suggestion: data.suggestion,
  };
}

export async function interpretRevision(client, diffs, textDiff, chain) {
  const chainSummary = chain && chain.length > 0 ? formatChainSummary(chain) : "";
  const userPrompt = buildInterpreterPrompt(diffs, textDiff, chainSummary);
  const result = await client.call(INTERPRETER_SYSTEM_PROMPT, userPrompt);
  if (result === null) return null;
  return parseRevisionNotes(result);
}
