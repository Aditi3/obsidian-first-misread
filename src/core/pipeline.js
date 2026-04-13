import { analyzeContent } from './analyzer.js';
import { getCorePersonas, getDynamicPersonas } from './personas.js';
import { selectDynamicPersonas } from './selector.js';
import { simulateAll } from './simulator.js';
import { aggregateFindings } from './aggregator.js';
import { identifyStrengths } from './strengths.js';

const MIN_WORDS = 50;
const MAX_WORDS = 2500;

export function validateInput(text) {
  text = text.trim();
  const wordCount = text.split(/\s+/).length;
  if (wordCount < MIN_WORDS) {
    throw new Error(`Input too short: ${wordCount} words (minimum ${MIN_WORDS})`);
  }
  if (wordCount > MAX_WORDS) {
    throw new Error(`Input too long: ${wordCount} words (maximum ${MAX_WORDS})`);
  }
  return text;
}

export async function runPipeline(client, text, onProgress) {
  const emit = onProgress || (() => {});

  text = validateInput(text);

  const metadata = analyzeContent(text);
  emit({ type: 'metadata', metadata });

  const core = getCorePersonas();
  const dynamic = getDynamicPersonas();
  const selectedDynamic = await selectDynamicPersonas(client, text, metadata, dynamic);
  const allPersonas = [...core, ...selectedDynamic];

  emit({
    type: 'personas-selected',
    personas: allPersonas.map(p => p.name),
  });

  const personaResults = await simulateAll(client, allPersonas, text, metadata, emit);
  const aggregatedFindings = aggregateFindings(personaResults);

  const strengths = await identifyStrengths(client, text, metadata, personaResults);

  emit({ type: 'complete' });

  return {
    metadata,
    personas: allPersonas,
    personaResults,
    aggregatedFindings,
    strengths,
  };
}
