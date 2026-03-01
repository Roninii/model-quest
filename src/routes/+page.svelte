<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { CategoryId } from '$lib/types';
  import { benchmarks, MODELS, CATEGORY_ORDER } from '$lib/data/benchmarks';
  import CategoryPills from '$lib/components/CategoryPills.svelte';
  import RankingBar from '$lib/components/RankingBar.svelte';
  import ExampleComparison from '$lib/components/ExampleComparison.svelte';
  import ModelCard from '$lib/components/ModelCard.svelte';
  import Playground from '$lib/components/Playground.svelte';

  let selectedCategory = $state<CategoryId>('conversational');
  let categoryData = $derived(benchmarks[selectedCategory]);

  function handleCategoryChange(id: CategoryId) {
    selectedCategory = id;
  }
</script>

<svelte:head>
  <title>Model Quest — AI Model Benchmarks</title>
  <meta name="description" content="Side-by-side comparisons of Claude, GPT-5, Gemini, DeepSeek, and Grok across conversational, coding, creative writing, reasoning, and more." />
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────── -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-text" in:fly={{ y: 16, duration: 300, delay: 60 }}>
      <p class="hero-eyebrow">v2 · 2026 Edition</p>
      <h1 class="hero-title">
        Model <em class="hero-accent">Quest</em>
      </h1>
      <p class="hero-subtitle">Find the right AI model for every task</p>
      <p class="hero-desc">
        Real responses. Side-by-side comparisons. No synthetic benchmarks —
        just the outputs that matter when choosing models in production.
      </p>
    </div>

    <!-- Model chips -->
    <div class="model-chips-grid" in:fly={{ y: 12, duration: 300, delay: 160 }}>
      {#each MODELS as model, i}
        {@const catRankings = categoryData.rankings}
        {@const ranking = catRankings.find(r => r.model === model.id)}
        <ModelCard {model} score={ranking?.score} />
      {/each}
    </div>
  </div>

  <!-- Decorative grain -->
  <div class="hero-grain" aria-hidden="true"></div>
</section>

<!-- ── Sticky category nav ────────────────────────────────── -->
<div class="category-nav-sticky">
  <div class="container">
    <CategoryPills selected={selectedCategory} onSelect={handleCategoryChange} />
  </div>
</div>

<!-- ── Rankings ────────────────────────────────────────────── -->
<section class="section rankings-section" aria-labelledby="rankings-heading">
  <div class="container">
    {#key selectedCategory}
      <div in:fly={{ y: 8, duration: 220 }}>
        <div class="section-header">
          <div>
            <p class="section-eyebrow"><span class="eyebrow-icon">{@html categoryData.icon}</span> {categoryData.label}</p>
            <h2 id="rankings-heading" class="section-title">Model Rankings</h2>
            <p class="section-desc">{categoryData.description}</p>
          </div>
          <div class="rankings-scale">
            <span>Score / 10</span>
          </div>
        </div>

        <div class="rankings-card card">
          <RankingBar rankings={categoryData.rankings} animate={true} />
        </div>
      </div>
    {/key}
  </div>
</section>

<!-- ── Example Comparisons ─────────────────────────────────── -->
<section class="section examples-section" aria-labelledby="examples-heading">
  <div class="container">
    {#key selectedCategory}
      <div in:fly={{ y: 8, duration: 220, delay: 40 }}>
        <div class="section-header">
          <div>
            <h2 id="examples-heading" class="section-title">Example Responses</h2>
            <p class="section-desc">
              See how each model actually responds. Click the model tabs to compare.
            </p>
          </div>
        </div>

        <div class="examples-stack">
          {#each categoryData.examples as example, i}
            <ExampleComparison {example} exampleIndex={i} />
          {/each}
        </div>
      </div>
    {/key}
  </div>
</section>

<!-- ── Playground ────────────────────────────────────────────── -->
<section class="section playground-section" aria-labelledby="playground-heading" id="playground">
  <div class="container">
    <div class="section-header">
      <div>
        <p class="section-eyebrow"><span class="eyebrow-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6l2 7H7L9 3z"/><path d="M5 10h14"/><path d="M12 10v11"/><path d="M7 21h10"/><circle cx="8" cy="10" r="1"/><circle cx="16" cy="10" r="1"/></svg></span> Interactive</p>
        <h2 id="playground-heading" class="section-title">Try It Yourself</h2>
        <p class="section-desc">
          Connect to OpenRouter to test any model with your own prompts.
          Your API key is stored in memory only — never persisted.
        </p>
      </div>
    </div>

    <div class="playground-wrapper card card--elevated">
      <Playground />
    </div>
  </div>
</section>

<style>
  /* ── Hero ──────────────────────────────────────────────── */
  .hero {
    position: relative;
    overflow: hidden;
    padding: clamp(var(--space-12), 8vw, var(--space-24)) 0 clamp(var(--space-8), 5vw, var(--space-16));
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .hero-grain {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    pointer-events: none;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  .hero-text {
    max-width: 680px;
  }

  .hero-eyebrow {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary);
    margin-bottom: var(--space-3);
    max-width: none;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-text);
    line-height: 1.05;
    margin-bottom: var(--space-4);
  }

  .hero-accent {
    color: var(--color-primary);
    font-style: italic;
  }

  .hero-subtitle {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 400;
    color: var(--color-text-muted);
    margin-bottom: var(--space-4);
    max-width: 55ch;
    line-height: 1.4;
  }

  .hero-desc {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-width: 58ch;
    line-height: 1.7;
  }

  .model-chips-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding-top: var(--space-2);
  }

  /* ── Category nav ────────────────────────────────────── */
  .category-nav-sticky {
    position: sticky;
    top: 60px;
    z-index: 90;
    background: color-mix(in oklab, var(--color-bg) 92%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-3) 0;
  }

  /* ── Sections ────────────────────────────────────────────── */
  .section {
    padding: clamp(var(--space-8), 5vw, var(--space-16)) 0;
  }

  .section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .section-eyebrow {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-primary);
    margin-bottom: var(--space-2);
    max-width: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  .eyebrow-icon {
    display: inline-flex;
    align-items: center;
    color: currentColor;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .section-desc {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-width: 55ch;
  }

  .rankings-scale {
    font-size: var(--text-xs);
    color: var(--color-text-faint);
    font-family: var(--font-mono);
    white-space: nowrap;
    padding-top: var(--space-8);
  }

  .rankings-card {
    padding: var(--space-6);
  }

  /* ── Examples ────────────────────────────────────────────── */
  .examples-section {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .examples-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  /* ── Playground ────────────────────────────────────────────── */
  .playground-section {
    background: var(--color-surface);
  }

  .playground-wrapper {
    padding: var(--space-6);
  }

  @media (max-width: 640px) {
    .section-header { flex-direction: column; }
    .rankings-scale { display: none; }
    .playground-wrapper { padding: var(--space-4); }
  }
</style>
