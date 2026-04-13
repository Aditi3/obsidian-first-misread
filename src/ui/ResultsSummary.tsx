import { FindingCard } from "./FindingCard";

interface Strength {
  passage: string;
  location: string;
  why: string;
}

interface PersonaResult {
  persona: string;
  findings: any[];
  overall_verdict?: string;
}

interface Props {
  aggregatedFindings: any[];
  personaResults: PersonaResult[];
  strengths?: Strength[] | null;
  onHighlight: (passage: string) => void;
}

export function ResultsSummary({ aggregatedFindings, personaResults, strengths, onHighlight }: Props) {
  return (
    <div class="fm-results-summary">
      <h3>
        {aggregatedFindings.length} finding
        {aggregatedFindings.length !== 1 ? "s" : ""}
      </h3>

      {aggregatedFindings.length === 0 && (
        <p class="fm-no-findings">
          No misread risks detected. Your writing looks clear!
        </p>
      )}

      {aggregatedFindings.map((f: any, i: number) => (
        <FindingCard key={i} finding={f} onHighlight={onHighlight} />
      ))}

      {strengths && strengths.length > 0 && (
        <>
          <h3>What's Landing</h3>
          <div class="fm-strengths">
            {strengths.map((s: Strength, i: number) => (
              <div
                key={i}
                class="fm-strength-entry"
                onClick={() => onHighlight(s.passage)}
                style={{ cursor: "pointer" }}
              >
                <blockquote>"{s.passage}"</blockquote>
                <p class="fm-strength-meta">
                  <span class="fm-strength-location">{s.location}</span> — {s.why}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <h3>Persona Verdicts</h3>
      <div class="fm-persona-verdicts">
        {personaResults.map((r) => (
          <span
            key={r.persona}
            class={`fm-verdict-pill ${r.findings.length ? "fm-concerns" : "fm-pass"}`}
          >
            {r.findings.length ? "\u26A0" : "\u2713"} {r.persona}
          </span>
        ))}
      </div>
    </div>
  );
}
