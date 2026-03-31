import { describe, it, expect, vi } from "vitest";
import {
  formatChainSummary,
  buildInterpreterPrompt,
  parseRevisionNotes,
  interpretRevision,
} from "../../src/core/interpreter.js";

function makeRunRecord(findings, runId = "run-001") {
  return {
    run_id: runId,
    timestamp: "2026-03-28T20:07:36",
    slug: "test-slug",
    content_hash: "abc123",
    word_count: 100,
    model: "test-model",
    personas_run: ["TestPersona"],
    parent_run_id: null,
    metadata: {},
    findings: findings.map((passage) => ({
      passage,
      location: "paragraph 1",
      severity: "medium",
      personas: ["TestPersona"],
      descriptions: [{ persona: "TestPersona", what_happened: "test" }],
    })),
    persona_verdicts: [],
  };
}

describe("formatChainSummary", () => {
  it("formats chain records with version numbers", () => {
    const chain = [
      makeRunRecord(["issue one", "issue two"], "run-001"),
      makeRunRecord(["issue one"], "run-002"),
    ];
    const result = formatChainSummary(chain);
    expect(result).toContain("run-001 (v1)");
    expect(result).toContain("2 findings");
    expect(result).toContain("run-002 (v2)");
    expect(result).toContain("1 findings");
  });

  it("returns empty string for empty chain", () => {
    expect(formatChainSummary([])).toBe("");
  });
});

describe("buildInterpreterPrompt", () => {
  it("includes chain history section when provided", () => {
    const diffs = [
      {
        status: "persists",
        current_finding: {
          passage: "This is confusing",
          severity: "high",
          personas: ["A", "B"],
        },
        parent_finding: {
          passage: "This is confusing",
          severity: "medium",
          personas: ["A"],
        },
        severity_change: "escalated",
        persona_count_change: 1,
        run_streak: 3,
      },
    ];
    const result = buildInterpreterPrompt(diffs, "- some diff", "v1: 3 findings");
    expect(result).toContain("## Chain History");
    expect(result).toContain("## Finding Diffs");
    expect(result).toContain("[PERSISTS]");
    expect(result).toContain("severity escalated");
    expect(result).toContain("+1 personas");
    expect(result).toContain("streak: 3");
    expect(result).toContain("## Content Diff");
  });

  it("omits chain history section when empty", () => {
    const diffs = [
      {
        status: "new",
        current_finding: { passage: "New issue" },
        parent_finding: null,
        severity_change: null,
        persona_count_change: null,
        run_streak: 0,
      },
    ];
    const result = buildInterpreterPrompt(diffs, "", "");
    expect(result).not.toContain("## Chain History");
  });
});

describe("parseRevisionNotes", () => {
  it("returns structured object for valid data", () => {
    const data = {
      what_landed: ["Fixed the intro"],
      what_persists: ["Middle section still confusing"],
      what_regressed: [],
      revision_pattern: "Surface-level edits",
      suggestion: "Restructure the middle",
    };
    const result = parseRevisionNotes(data);
    expect(result).not.toBeNull();
    expect(result.what_landed).toEqual(["Fixed the intro"]);
    expect(result.revision_pattern).toBe("Surface-level edits");
  });

  it("returns null for invalid data", () => {
    expect(parseRevisionNotes({})).toBeNull();
    expect(parseRevisionNotes(null)).toBeNull();
  });
});

describe("interpretRevision", () => {
  it("calls client and returns parsed notes", async () => {
    const mockClient = {
      call: vi.fn().mockResolvedValue({
        what_landed: ["Fixed intro"],
        what_persists: ["Middle confusing"],
        what_regressed: [],
        revision_pattern: "Surface edits",
        suggestion: "Go deeper",
      }),
    };
    const diffs = [
      {
        status: "persists",
        current_finding: { passage: "test" },
        parent_finding: { passage: "test" },
        severity_change: null,
        persona_count_change: 0,
        run_streak: 2,
      },
    ];
    const chain = [makeRunRecord(["test"], "run-001")];
    const result = await interpretRevision(mockClient, diffs, "diff text", chain);
    expect(result).not.toBeNull();
    expect(result.what_landed).toEqual(["Fixed intro"]);
    expect(mockClient.call).toHaveBeenCalledOnce();
  });

  it("returns null when client returns null", async () => {
    const mockClient = { call: vi.fn().mockResolvedValue(null) };
    const result = await interpretRevision(mockClient, [], "", []);
    expect(result).toBeNull();
  });
});
