const SIMULATION_SYSTEM_PROMPT = `You are simulating a specific reader persona. Read the text below exactly as this persona would — follow their behavior, focus on what they focus on, stop when they'd stop.

Return your findings as JSON with this exact structure:
{
  "persona": "Persona Name",
  "behavior_executed": "What you actually did while reading",
  "time_simulated": "How long this persona would spend",
  "overall_verdict": "One-sentence summary of this persona's experience",
  "findings": [
    {
      "type": "confusion | lost_interest | misread | skipped",
      "severity": "high | medium | low",
      "passage": "The exact text that caused the issue",
      "location": "paragraph N, sentence N",
      "what_happened": "Description of the problem",
      "what_persona_understood": "What the persona took away",
      "what_author_likely_meant": "What the author probably intended"
    }
  ]
}

If this persona would have no issues, return an empty findings array. Be honest — don't invent problems that wouldn't occur for this reading behavior.`;

export async function simulatePersona(client, persona, text, metadata) {
  const userPrompt = `## Persona: ${persona.name}

**Behavior:** ${persona.behavior}

**Focus areas:** ${persona.focus.join(', ')}

**Stops when:** ${persona.stops_when}

## Content metadata
Word count: ${metadata.wordCount} | Read time: ${metadata.estimatedReadTimeMinutes} min
Paragraphs: ${metadata.paragraphCount} | Headings: ${metadata.headingCount}

## Text to read

${text}`;

  const result = await client.call(SIMULATION_SYSTEM_PROMPT, userPrompt);
  if (!result) return null;

  if (!result.persona || !Array.isArray(result.findings)) {
    return null;
  }

  return result;
}

export async function simulateAll(client, personas, text, metadata, onProgress) {
  const promises = personas.map(async (persona) => {
    if (onProgress) onProgress({ type: 'persona-started', persona: persona.name });
    const result = await simulatePersona(client, persona, text, metadata);
    if (onProgress && result) {
      onProgress({ type: 'persona-done', persona: persona.name, findingCount: result.findings.length });
    }
    return result;
  });

  const settled = await Promise.allSettled(promises);

  const results = [];
  for (const outcome of settled) {
    if (outcome.status === 'fulfilled' && outcome.value) {
      results.push(outcome.value);
    }
  }
  return results;
}
