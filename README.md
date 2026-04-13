# First Misread

Stress-test your writing with synthetic reader personas. Find the first place your draft gets misunderstood — before a real reader does.

First Misread is an Obsidian plugin that runs your active note through a panel of AI-simulated readers, each with different reading behaviors (skimming, skepticism, emotional response, etc.). It surfaces the exact passage where each persona gets confused, loses interest, or misinterprets your intent.

This is not a writing assistant or grammar checker. It's a diverse synthetic audience that finds your blind spots.

## What it does

- **Analyzes your active note** against multiple reader personas in parallel
- **Shows where each persona stopped** — the specific passage and why
- **Click any finding** to jump to and highlight the passage in your note
- **Tracks revision history** — re-analyze after edits to see what improved
- **Optionally generates rewrites** for flagged passages

## Personas

Personas define *how* a simulated reader approaches your text. Each has a reading behavior, focus areas, and conditions that make them stop.

**Core personas** (always run):

| Persona | What they test |
|---------|---------------|
| The Skimmer | Does the piece survive non-linear, partial reading? |
| The Busy Reader | Does the opening earn enough interest to keep reading? |
| The Hook Judge | Does the first line work? |
| The Skeptic | Are claims supported — logically and with credibility? |
| The Sensitivity Scanner | Anything that could land badly out of context? |
| The Voice Editor | Is the voice consistent, authentic, and cringe-free? |
| The Executor | Can the reader actually do something with this? |

**Dynamic personas** (selected per-analysis based on content):

Literal Reader, Domain Outsider, Emotional Reader, Scope Cop, Mirror Seeker, Visualizer, Arc Reader, Contrarian, First Principles Thinker, Expansionist, Outsider, Troll.

**Custom personas**: Drop a YAML file in `personas/custom/` to define your own.

## Installation

### Via BRAT (recommended)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) in Obsidian
2. Add beta plugin: `aviralv/obsidian-first-misread`
3. Enable the plugin

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Create `<vault>/.obsidian/plugins/first-misread/`
3. Copy the three files into that folder
4. Enable the plugin in Obsidian settings

## Setup

1. Open **Settings > First Misread**
2. Choose your LLM provider: Anthropic, OpenAI, Google, or any OpenAI-compatible endpoint
3. Enter your API key
4. (Optional) Change the model — defaults to `claude-sonnet-4-6`
5. (Optional) Set a custom base URL for proxies or local models

## Usage

1. Open a note you want to test
2. Run the command **First Misread: Analyze active note** (or use the ribbon icon)
3. Watch personas report in real-time in the side panel
4. Click any finding to highlight the passage in your note
5. Edit and re-analyze to track improvement

## Building from source

```bash
npm install
npm run build
```

Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugin folder.

For development:

```bash
npm run dev
```

## License

[MIT](LICENSE)
