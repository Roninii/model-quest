<p align="center">
  <img src="docs/screenshots/hero-light.png" alt="Model Quest — Find the right AI model for every task" width="800" />
</p>

# Model Quest

**Find the right AI model for every task.**

Model Quest is an interactive benchmarking app that helps developers and teams choose the right AI model for their specific use case. Instead of relying on abstract leaderboard scores, it shows you real model responses side-by-side so you can judge output quality yourself.

## Who is this for?

- **Developers building multi-model systems** who need to decide which model handles which task (routing, fallbacks, cost optimization).
- **Engineering leads** evaluating whether to adopt a new model or stick with what works.
- **Anyone choosing between AI providers** who wants to see how models actually perform on real prompts — not just synthetic benchmarks.

## Features

### Benchmark Categories

Six practical categories with curated rankings and scored comparisons:

- **Conversational** — Empathy, tone, and natural dialogue
- **Coding** — Code generation, debugging, and architecture
- **Creative Writing** — Voice, storytelling, and originality
- **Reasoning** — Logic, math, and multi-step problem solving
- **Instruction Following** — Precision and constraint adherence
- **Summarization** — Compression, clarity, and fidelity

Each category includes ranked model scores and real example responses you can tab through to compare how Claude, GPT-5.2, Gemini, DeepSeek, and Grok handle the same prompt.

<p align="center">
  <img src="docs/screenshots/rankings-light.png" alt="Model rankings with scored bars for each AI model" width="800" />
</p>

### Real Example Responses

Every benchmark category includes curated prompts with actual model outputs. Tab between models to see how each one approaches the same task — no cherry-picking, no synthetic scores.

<p align="center">
  <img src="docs/screenshots/examples-light.png" alt="Side-by-side example responses from different AI models" width="800" />
</p>

### Interactive Playground

Bring your own [OpenRouter](https://openrouter.ai/) API key and test any prompt against up to 4 models simultaneously. Responses render with full markdown support and display side-by-side for easy comparison.

### Model Picker — "When Does Model Size Actually Matter?"

A practical guide to choosing between small, medium, and frontier models. Includes:

- **Cost-Quality Spectrum** — Three model tiers with pricing, speed, and context window breakdowns
- **Task Decision Matrix** — 12 common use cases mapped to recommended model tiers
- **"Good Enough" Calculator** — Select a task and priority to get a personalized tier recommendation

<p align="center">
  <img src="docs/screenshots/picker-dark.png" alt="Model Picker page showing cost-quality spectrum across model tiers" width="800" />
</p>

<p align="center">
  <img src="docs/screenshots/picker-tasks-dark.png" alt="Task decision matrix and the Good Enough Calculator" width="800" />
</p>

### Light & Dark Themes

Full light and dark mode support with a warm, fox-orange design system. Automatically respects system preference with a manual toggle.

<p align="center">
  <img src="docs/screenshots/hero-dark.png" alt="Model Quest in dark mode" width="800" />
</p>

## Models Covered

| Model | Provider |
|---|---|
| Claude Sonnet 4.6 | Anthropic |
| GPT-5.2 | OpenAI |
| Gemini 3.1 Pro | Google |
| DeepSeek V3.2 | DeepSeek |
| Grok 4.20 | xAI |

The Model Picker page also references smaller and frontier-tier models like Claude Haiku 4, GPT-5.2 Mini, Gemini 3.1 Flash, Claude Opus 4, and more.

## Tech Stack

- **[SvelteKit 5](https://svelte.dev/)** with TypeScript
- **Hash-based SPA routing** — deploys anywhere as static files
- **[OpenRouter API](https://openrouter.ai/)** — for live model testing in the playground
- **[marked](https://marked.js.org/)** — markdown rendering for model responses
- **CSS custom properties** — full design token system with light/dark themes
- **Fraunces** (display), **Inter** (body), **JetBrains Mono** (code)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An [OpenRouter API key](https://openrouter.ai/keys) (optional — only needed for the interactive playground)

### Install & Run

```bash
git clone https://github.com/Roninii/model-quest.git
cd model-quest
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're in.

### Build for Production

```bash
npm run build
```

The output lands in `build/` as a fully static site you can deploy to any hosting provider (Vercel, Netlify, Cloudflare Pages, S3, etc.).

## Project Structure

```
src/
├── app.css                          # Design tokens, themes, global styles
├── app.html                         # HTML shell
├── lib/
│   ├── components/
│   │   ├── Nav.svelte               # Navigation with fox logo
│   │   ├── CategoryPills.svelte     # Benchmark category tabs
│   │   ├── RankingBar.svelte        # Animated score bars
│   │   ├── ExampleComparison.svelte # Tabbed model response viewer
│   │   ├── Playground.svelte        # Multi-model live testing
│   │   ├── ModelCard.svelte         # Model score badges
│   │   ├── ThemeToggle.svelte       # Light/dark mode switch
│   │   └── Footer.svelte
│   ├── data/
│   │   ├── benchmarks.ts            # Rankings + example responses per category
│   │   └── picker.ts                # Model tiers + use case mappings
│   ├── stores/
│   │   └── theme.svelte.ts          # Theme state (Svelte 5 runes)
│   └── types.ts
├── routes/
│   ├── +layout.svelte               # App shell
│   ├── +page.svelte                 # Benchmarks page
│   └── picker/
│       └── +page.svelte             # Model Picker page
└── static/
    └── favicon.svg                  # Fox with sword & shield
```

## License

MIT
