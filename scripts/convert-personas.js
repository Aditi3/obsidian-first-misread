import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

const PERSONAS_ROOT = join(import.meta.dirname, "../personas");

function loadDir(subdir) {
  const dir = join(PERSONAS_ROOT, subdir);
  let files;
  try {
    files = readdirSync(dir)
      .filter((f) => f.endsWith(".yaml"))
      .sort();
  } catch {
    return [];
  }
  return files.map((f) => {
    const raw = readFileSync(join(dir, f), "utf8");
    return parse(raw);
  });
}

const core = loadDir("core");
const dynamic = loadDir("dynamic");

const output = `// Auto-generated from personas/*.yaml — do not edit manually.
// Run: node scripts/convert-personas.js

const CORE_PERSONAS = ${JSON.stringify(core, null, 2)};

const DYNAMIC_PERSONAS = ${JSON.stringify(dynamic, null, 2)};

export function getCorePersonas() {
  return CORE_PERSONAS;
}

export function getDynamicPersonas() {
  return DYNAMIC_PERSONAS;
}

export function getAllPersonas() {
  return [...CORE_PERSONAS, ...DYNAMIC_PERSONAS];
}
`;

writeFileSync(join(import.meta.dirname, "../src/core/personas.js"), output);
console.log(`Converted ${core.length} core + ${dynamic.length} dynamic personas`);
