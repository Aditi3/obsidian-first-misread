const VALID_FINDING_TYPES = ['confusion', 'lost_interest', 'misread', 'skipped', 'duplication', 'structural'];
const VALID_SEVERITIES = ['high', 'medium', 'low'];

export function createContentMetadata(fields) {
  return { ...fields };
}

export function createFinding(fields) {
  if (!VALID_FINDING_TYPES.includes(fields.type)) {
    throw new Error(`Invalid finding type: ${fields.type}`);
  }
  if (!VALID_SEVERITIES.includes(fields.severity)) {
    throw new Error(`Invalid severity: ${fields.severity}`);
  }
  return { ...fields };
}

export function createPersonaResult(fields) {
  return {
    ...fields,
    findings: (fields.findings || []).map(createFinding),
  };
}

export function createAggregatedFinding(fields) {
  return { feedbackStatus: 'pending', ...fields };
}

export function computeFeedbackCounts(findings) {
  const counts = { pending: 0, dismissed: 0, accepted: 0 };
  for (const f of findings) {
    counts[f.feedbackStatus] = (counts[f.feedbackStatus] || 0) + 1;
  }
  return counts;
}

export function signalStrength(personas) {
  const n = personas.length;
  return `flagged by ${n} persona${n !== 1 ? 's' : ''}`;
}
