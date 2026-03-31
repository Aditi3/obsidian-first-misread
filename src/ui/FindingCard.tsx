import { useState } from "preact/hooks";
import { signalStrength } from "../core/models.js";

interface Finding {
  passage: string;
  location: string;
  severity: string;
  personas: string[];
  descriptions: Array<{ persona: string; what_happened: string }>;
}

export function FindingCard({ finding }: { finding: Finding }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      class={`fm-finding-card fm-severity-${finding.severity}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div class="fm-finding-header">
        <span class={`fm-severity-badge fm-severity-${finding.severity}`}>
          {finding.severity}
        </span>
        <span class="fm-finding-desc">
          {finding.descriptions[0]?.what_happened}
        </span>
      </div>
      <div class="fm-finding-meta">
        {signalStrength(finding.personas)} &middot; {finding.location}
      </div>
      {expanded && (
        <div class="fm-finding-detail">
          <blockquote class="fm-passage">"{finding.passage}"</blockquote>
          {finding.descriptions.map((d) => (
            <p key={d.persona}>
              <strong>{d.persona}:</strong> {d.what_happened}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
