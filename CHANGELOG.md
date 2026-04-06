# Changelog

## 0.1.2

Bug fixes.

- Fix: reset panel state when switching notes (stale results no longer persist)
- Fix: strip YAML frontmatter before analysis (frontmatter was getting flagged as misread)

## 0.1.1

Security hardening.

- Add XML trust boundaries to all LLM prompt templates (mitigates prompt injection via crafted articles)
- Harden `.gitignore` (add `.env*`, `.claude/` rules)
- Track `main.js` in repo for BRAT distribution

## 0.1.0

Initial release.

- Analyze active note with synthetic reader personas
- Side panel with persona progress, finding cards, results summary
- Version history tracking with revision interpreter
- Multi-provider LLM support (Anthropic, OpenAI, Google, OpenAI-compatible)
- BRAT compatible
