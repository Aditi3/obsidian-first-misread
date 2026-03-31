interface RevisionNotesData {
  what_landed: string[];
  what_persists: string[];
  what_regressed: string[];
  revision_pattern: string;
  suggestion: string;
}

interface DiffSummary {
  status: string;
  current_finding?: any;
  parent_finding?: any;
}

interface Props {
  notes: RevisionNotesData;
  diffs: DiffSummary[];
}

export function RevisionNotes({ notes, diffs }: Props) {
  const counts = {
    new: diffs.filter((d) => d.status === "new").length,
    persists: diffs.filter((d) => d.status === "persists").length,
    resolved: diffs.filter((d) => d.status === "resolved").length,
    regressed: diffs.filter((d) => d.status === "regressed").length,
  };

  return (
    <div class="fm-revision-notes">
      <h3>Changes from Previous Run</h3>

      <div class="fm-diff-counts">
        {counts.resolved > 0 && (
          <span class="fm-diff-resolved">
            {counts.resolved} resolved
          </span>
        )}
        {counts.new > 0 && (
          <span class="fm-diff-new">{counts.new} new</span>
        )}
        {counts.persists > 0 && (
          <span class="fm-diff-persists">
            {counts.persists} persists
          </span>
        )}
        {counts.regressed > 0 && (
          <span class="fm-diff-regressed">
            {counts.regressed} regressed
          </span>
        )}
      </div>

      {notes.what_landed.length > 0 && (
        <div class="fm-section">
          <h4>What Landed</h4>
          <ul>
            {notes.what_landed.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes.what_persists.length > 0 && (
        <div class="fm-section">
          <h4>What Persists</h4>
          <ul>
            {notes.what_persists.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes.what_regressed.length > 0 && (
        <div class="fm-section">
          <h4>What Regressed</h4>
          <ul>
            {notes.what_regressed.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div class="fm-section">
        <h4>Revision Pattern</h4>
        <p>{notes.revision_pattern}</p>
      </div>

      <div class="fm-section">
        <h4>Suggestion</h4>
        <p>{notes.suggestion}</p>
      </div>
    </div>
  );
}
