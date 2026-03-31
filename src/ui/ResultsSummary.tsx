import { FindingCard } from "./FindingCard";

interface PersonaResult {
  persona: string;
  findings: any[];
  overall_verdict?: string;
}

interface Props {
  aggregatedFindings: any[];
  personaResults: PersonaResult[];
}

export function ResultsSummary({ aggregatedFindings, personaResults }: Props) {
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
        <FindingCard key={i} finding={f} />
      ))}

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
