const SELECTOR_SYSTEM_PROMPT = `You select which additional reader personas should review a piece of writing.

You'll receive the text, its structural metadata, and a catalog of available dynamic personas.

Based on the content's characteristics (metaphor-heavy, claim-heavy, jargon-dense, personal stories, etc.), pick 1-3 personas most likely to surface misread risks.

Return JSON: {"dynamic_personas": ["filename-without-extension", ...]}
Only use filenames from the provided catalog.`;

export function buildCatalog(dynamicPersonas) {
  const catalog = {};
  for (const p of dynamicPersonas) {
    const key = p.name.toLowerCase().replace('the ', '').replaceAll(' ', '-');
    catalog[key] = p;
  }
  return catalog;
}

export async function selectDynamicPersonas(client, text, metadata, availableDynamic) {
  const catalog = buildCatalog(availableDynamic);
  const catalogDesc = Object.entries(catalog)
    .map(([key, p]) => `- ${key}: ${p.name} — ${p.behavior.trim().slice(0, 100)}`)
    .join('\n');

  const metadataJson = JSON.stringify(metadata, null, 2);

  const userPrompt = `## Content to analyze

${text}

## Structural metadata

${metadataJson}

## Available dynamic personas

${catalogDesc}

Select 1-3 personas. Return JSON: {"dynamic_personas": ["name", ...]}`;

  const result = await client.call(SELECTOR_SYSTEM_PROMPT, userPrompt);

  if (!result || !result.dynamic_personas) {
    return [];
  }

  const selected = [];
  for (const name of result.dynamic_personas) {
    if (catalog[name]) {
      selected.push(catalog[name]);
    }
  }
  return selected;
}
