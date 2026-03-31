const STATUS_ICONS: Record<string, string> = {
  waiting: "\u25CB",
  reading: "\u27F3",
  done: "\u2713",
  error: "\u2717",
};

interface Persona {
  name: string;
  status: string;
  findingCount: number;
}

export function PersonaProgress({ personas }: { personas: Persona[] }) {
  return (
    <div class="fm-persona-progress">
      {personas.map((p) => (
        <div class="fm-persona-row" key={p.name}>
          <span class={`fm-status-icon fm-status-${p.status}`}>
            {STATUS_ICONS[p.status]}
          </span>
          <span class="fm-persona-name">{p.name}</span>
          {p.status === "done" && (
            <span class="fm-finding-count">
              {p.findingCount} finding{p.findingCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
