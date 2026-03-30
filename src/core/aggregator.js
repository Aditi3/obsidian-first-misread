const OVERLAP_THRESHOLD = 0.6;
const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

export function passagesOverlap(a, b) {
  const tokensA = new Set(a.toLowerCase().split(/\s+/));
  const tokensB = new Set(b.toLowerCase().split(/\s+/));
  const union = new Set([...tokensA, ...tokensB]);
  if (union.size === 0) return true;
  let intersection = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) intersection++;
  }
  const ratio = (2 * intersection) / (tokensA.size + tokensB.size);
  return ratio >= OVERLAP_THRESHOLD;
}

function highestSeverity(...severities) {
  return severities.reduce((a, b) =>
    (SEVERITY_ORDER[a] ?? 99) <= (SEVERITY_ORDER[b] ?? 99) ? a : b
  );
}

export function aggregateFindings(results) {
  const aggregated = [];

  for (const result of results) {
    for (const finding of result.findings) {
      let merged = false;
      for (const agg of aggregated) {
        if (passagesOverlap(finding.passage, agg.passage)) {
          agg.personas.push(result.persona);
          agg.descriptions.push({
            persona: result.persona,
            what_happened: finding.what_happened,
          });
          agg.severity = highestSeverity(agg.severity, finding.severity);
          merged = true;
          break;
        }
      }
      if (!merged) {
        aggregated.push({
          passage: finding.passage,
          location: finding.location,
          severity: finding.severity,
          personas: [result.persona],
          descriptions: [{
            persona: result.persona,
            what_happened: finding.what_happened,
          }],
        });
      }
    }
  }

  aggregated.sort((a, b) => {
    const sevDiff = (SEVERITY_ORDER[a.severity] ?? 99) - (SEVERITY_ORDER[b.severity] ?? 99);
    if (sevDiff !== 0) return sevDiff;
    return b.personas.length - a.personas.length;
  });

  return aggregated;
}
