<script lang="ts">
  import { fly, fade, scale } from 'svelte/transition';
  import {
    MODEL_TIERS,
    USE_CASES,
    RULES_OF_THUMB,
    CALCULATOR_USE_CASES,
    calculateRecommendation,
  } from '$lib/data/picker';
  import type { ModelTier } from '$lib/types';

  // ── Decision Matrix State ──
  let selectedUseCase = $state<string | null>(null);

  let selectedUseCaseData = $derived(
    selectedUseCase ? USE_CASES.find(u => u.id === selectedUseCase) : null
  );

  // ── Calculator State ──
  let calcUseCase = $state('factual-qa');
  let qualityWeight = $state(3);
  let costWeight = $state(3);
  let speedWeight = $state(3);

  let recommendation = $derived(
    calculateRecommendation(calcUseCase, qualityWeight, costWeight, speedWeight)
  );

  // Tier color map
  const TIER_COLOR_MAP: Record<ModelTier, string> = {
    small: 'var(--color-success)',
    medium: 'var(--color-warning)',
    large: 'var(--color-error)',
  };

  const TIER_LABEL_MAP: Record<ModelTier, string> = {
    small: 'Small model',
    medium: 'Medium model',
    large: 'Large / frontier model',
  };

  const TIER_BG_MAP: Record<ModelTier, string> = {
    small: 'var(--color-success-highlight)',
    medium: 'var(--color-warning-highlight)',
    large: 'var(--color-error-highlight)',
  };
</script>

<svelte:head>
  <title>Model Picker — When Does Size Actually Matter? | Model Quest</title>
  <meta name="description" content="A practical guide to choosing between small, medium, and large AI models based on your use case, quality requirements, and budget." />
</svelte:head>

<!-- ── Hero ─────────────────────────────────────────────── -->
<section class="picker-hero">
  <div class="container">
    <div class="picker-hero-inner" in:fly={{ y: 16, duration: 280, delay: 60 }}>
      <p class="section-eyebrow"><span class="eyebrow-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span> Practical Guide</p>
      <h1 class="picker-title">
        When Does Model Size <em class="title-accent">Actually</em> Matter?
      </h1>
      <p class="picker-subtitle">
        A task-by-task guide to choosing between small, medium, and frontier models.
        Spoiler: most tasks don't need GPT-5.
      </p>
    </div>
  </div>
</section>

<!-- ── Cost-Quality Spectrum ─────────────────────────────── -->
<section class="section spectrum-section" aria-labelledby="spectrum-heading">
  <div class="container">
    <h2 id="spectrum-heading" class="section-title">The Cost-Quality Spectrum</h2>
    <p class="section-desc">Three tiers of models, each with a distinct role in your stack.</p>

    <div class="tiers-grid">
      {#each MODEL_TIERS as tier, i}
        <div
          class="tier-card"
          style="--tier-color: {tier.color};"
          in:fly={{ y: 12, duration: 260, delay: i * 80 }}
        >
          <div class="tier-header">
            <span class="tier-badge" style="background: color-mix(in oklab, {tier.color} 15%, var(--color-surface)); color: {tier.color};">
              {tier.label}
            </span>
          </div>

          <div class="tier-examples">
            {#each tier.examples as example}
              <span class="tier-example">{example}</span>
            {/each}
          </div>

          <div class="tier-meta">
            <div class="tier-meta-item">
              <span class="tier-meta-label">Cost</span>
              <span class="tier-meta-value">{tier.priceRange}</span>
            </div>
            <div class="tier-meta-item">
              <span class="tier-meta-label">Speed</span>
              <span class="tier-meta-value">{tier.speed}</span>
            </div>
          </div>

          <!-- Spectrum bar indicator -->
          <div class="tier-bar-track">
            <div
              class="tier-bar-fill"
              style="width: {(i + 1) / 3 * 100}%; background: {tier.color};"
            ></div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Spectrum arrow -->
    <div class="spectrum-arrow" aria-hidden="true">
      <div class="arrow-line"></div>
      <div class="arrow-labels">
        <span>Cheaper · Faster · Less capable</span>
        <span>More expensive · Slower · More capable</span>
      </div>
    </div>
  </div>
</section>

<!-- ── Decision Matrix ───────────────────────────────────── -->
<section class="section matrix-section" aria-labelledby="matrix-heading">
  <div class="container">
    <div class="section-header-row">
      <div>
        <h2 id="matrix-heading" class="section-title">Task Decision Matrix</h2>
        <p class="section-desc">Click any task to see the recommended tier and the reasoning behind it.</p>
      </div>
    </div>

    <div class="matrix-layout">
      <!-- Task cards -->
      <div class="task-grid">
        {#each USE_CASES as useCase}
          <button
            class="task-card"
            class:task-card--selected={selectedUseCase === useCase.id}
            style="--task-color: {TIER_COLOR_MAP[useCase.recommendedTier]};"
            aria-pressed={selectedUseCase === useCase.id}
            onclick={() => selectedUseCase = selectedUseCase === useCase.id ? null : useCase.id}
          >
            <div class="task-card-inner">
              <span class="task-tier-dot" aria-hidden="true"></span>
              <span class="task-name">{useCase.name}</span>
              <span class="task-tier-label" style="color: {TIER_COLOR_MAP[useCase.recommendedTier]};">
                {TIER_LABEL_MAP[useCase.recommendedTier]}
              </span>
            </div>
          </button>
        {/each}
      </div>

      <!-- Detail panel -->
      <div class="detail-panel-wrapper">
        {#if selectedUseCaseData}
          {#key selectedUseCase}
            <div
              class="detail-panel card"
              in:fly={{ x: 12, duration: 220 }}
            >
              <div class="detail-header">
                <h3 class="detail-title">{selectedUseCaseData.name}</h3>
                <span
                  class="detail-tier-badge"
                  style="background: {TIER_BG_MAP[selectedUseCaseData.recommendedTier]}; color: {TIER_COLOR_MAP[selectedUseCaseData.recommendedTier]};"
                >
                  {TIER_LABEL_MAP[selectedUseCaseData.recommendedTier]}
                </span>
              </div>

              <div class="detail-section">
                <p class="detail-label">Why this tier</p>
                <p class="detail-text">{selectedUseCaseData.reason}</p>
              </div>

              <div class="detail-section detail-section--highlight">
                <p class="detail-label">Cost comparison</p>
                <p class="detail-text">{selectedUseCaseData.costComparison}</p>
              </div>

              <div class="detail-section detail-section--warning">
                <p class="detail-label">⚠ When it fails</p>
                <p class="detail-text">{selectedUseCaseData.gotcha}</p>
              </div>
            </div>
          {/key}
        {:else}
          <div class="detail-empty">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <p>Select a task to see the recommended tier and reasoning</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- ── Good Enough Calculator ────────────────────────────── -->
<section class="section calculator-section" aria-labelledby="calc-heading">
  <div class="container">
    <div class="section-header-row">
      <div>
        <p class="section-eyebrow"><span class="eyebrow-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg></span> Interactive</p>
        <h2 id="calc-heading" class="section-title">The "Good Enough" Calculator</h2>
        <p class="section-desc">
          Balance your priorities to get a personalized model tier recommendation.
        </p>
      </div>
    </div>

    <div class="calculator-layout">
      <!-- Inputs -->
      <div class="calc-inputs">
        <!-- Use case -->
        <div class="calc-field">
          <label for="calc-usecase" class="calc-label">Your use case</label>
          <select id="calc-usecase" class="input" bind:value={calcUseCase}>
            {#each CALCULATOR_USE_CASES as uc}
              <option value={uc.id}>{uc.label}</option>
            {/each}
          </select>
        </div>

        <!-- Quality slider -->
        <div class="calc-field">
          <div class="slider-header">
            <label for="quality-slider" class="calc-label">Quality importance</label>
            <span class="slider-value">{qualityWeight}/5</span>
          </div>
          <input
            type="range"
            id="quality-slider"
            class="slider"
            min="1" max="5" step="1"
            bind:value={qualityWeight}
          />
          <div class="slider-labels">
            <span>Good enough</span>
            <span>Must be excellent</span>
          </div>
        </div>

        <!-- Cost slider -->
        <div class="calc-field">
          <div class="slider-header">
            <label for="cost-slider" class="calc-label">Cost sensitivity</label>
            <span class="slider-value">{costWeight}/5</span>
          </div>
          <input
            type="range"
            id="cost-slider"
            class="slider"
            min="1" max="5" step="1"
            bind:value={costWeight}
          />
          <div class="slider-labels">
            <span>Cost doesn't matter</span>
            <span>Minimize cost</span>
          </div>
        </div>

        <!-- Speed slider -->
        <div class="calc-field">
          <div class="slider-header">
            <label for="speed-slider" class="calc-label">Speed importance</label>
            <span class="slider-value">{speedWeight}/5</span>
          </div>
          <input
            type="range"
            id="speed-slider"
            class="slider"
            min="1" max="5" step="1"
            bind:value={speedWeight}
          />
          <div class="slider-labels">
            <span>Speed is optional</span>
            <span>Sub-second response</span>
          </div>
        </div>
      </div>

      <!-- Result -->
      {#key `${calcUseCase}-${qualityWeight}-${costWeight}-${speedWeight}`}
        <div
          class="calc-result"
          in:fly={{ x: 12, duration: 200 }}
        >
          <div class="result-card card">
            <p class="result-label">Recommended tier</p>
            <div class="result-tier" style="color: {TIER_COLOR_MAP[recommendation.tier.id]};">
              <span class="result-tier-name">{recommendation.tier.label}</span>
              <span class="result-tier-cost">{recommendation.tier.priceRange}</span>
            </div>

            <p class="result-reasoning">{recommendation.reasoning}</p>

            <div class="result-examples">
              <p class="result-examples-label">Example models</p>
              <div class="result-chips">
                {#each recommendation.tier.examples as ex}
                  <span class="result-chip">{ex}</span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/key}
    </div>
  </div>
</section>

<!-- ── Rules of Thumb ────────────────────────────────────── -->
<section class="section rules-section" aria-labelledby="rules-heading">
  <div class="container container--narrow">
    <h2 id="rules-heading" class="section-title rules-title">Rules of Thumb</h2>
    <p class="section-desc rules-desc">
      Hard-won heuristics for picking models without running full evaluations.
    </p>

    <ol class="rules-list" role="list">
      {#each RULES_OF_THUMB as rule, i}
        <li
          class="rule-item"
          in:fly={{ y: 6, duration: 220, delay: i * 50 }}
        >
          <span class="rule-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <p class="rule-text">{rule}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<!-- ── CTA to Benchmarks ─────────────────────────────────── -->
<section class="section cta-section">
  <div class="container cta-inner">
    <div class="cta-text">
      <h2 class="cta-title">See the models in action</h2>
      <p class="cta-desc">Side-by-side response comparisons across 6 task categories.</p>
    </div>
    <a href="#/" class="btn btn-primary cta-btn">View Benchmarks →</a>
  </div>
</section>

<style>
  /* ── Hero ─────────────────────────────────────────────── */
  .picker-hero {
    padding: clamp(var(--space-12), 8vw, var(--space-24)) 0 clamp(var(--space-8), 5vw, var(--space-16));
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .picker-hero-inner {
    max-width: 700px;
  }

  .section-eyebrow {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary);
    margin-bottom: var(--space-3);
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

  .picker-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-text);
    line-height: 1.1;
    margin-bottom: var(--space-4);
  }

  .title-accent {
    color: var(--color-primary);
    font-style: italic;
  }

  .picker-subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 58ch;
    line-height: 1.6;
    font-family: var(--font-display);
    font-weight: 400;
  }

  /* ── Section common ────────────────────────────────────── */
  .section {
    padding: clamp(var(--space-8), 5vw, var(--space-16)) 0;
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
    margin-bottom: var(--space-8);
  }

  .section-header-row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  /* ── Spectrum ──────────────────────────────────────────── */
  .spectrum-section {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .tiers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  @media (max-width: 768px) {
    .tiers-grid { grid-template-columns: 1fr; }
  }

  .tier-card {
    padding: var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition:
      border-color var(--transition-interactive),
      box-shadow var(--transition-interactive);
  }

  .tier-card:hover {
    border-color: var(--tier-color);
    box-shadow: var(--shadow-sm);
  }

  .tier-header {
    margin-bottom: var(--space-4);
  }

  .tier-badge {
    display: inline-flex;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .tier-examples {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-5);
  }

  .tier-example {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    background: var(--color-surface-offset);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
  }

  .tier-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .tier-meta-item {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .tier-meta-label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .tier-meta-value {
    font-size: var(--text-xs);
    font-family: var(--font-mono);
    color: var(--color-text-muted);
  }

  .tier-bar-track {
    height: 4px;
    background: var(--color-surface-offset);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .tier-bar-fill {
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .spectrum-arrow {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .arrow-line {
    height: 2px;
    background: linear-gradient(
      to right,
      var(--color-success),
      var(--color-warning),
      var(--color-error)
    );
    border-radius: var(--radius-full);
    position: relative;
  }

  .arrow-line::after {
    content: '';
    position: absolute;
    right: 0;
    top: -5px;
    width: 0;
    height: 0;
    border-left: 8px solid var(--color-error);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  .arrow-labels {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs);
    color: var(--color-text-faint);
  }

  /* ── Matrix ────────────────────────────────────────────── */
  .matrix-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    align-items: start;
  }

  @media (max-width: 768px) {
    .matrix-layout { grid-template-columns: 1fr; }
  }

  .task-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }

  @media (max-width: 500px) {
    .task-grid { grid-template-columns: 1fr; }
  }

  .task-card {
    display: block;
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-align: left;
    cursor: pointer;
    transition:
      border-color var(--transition-interactive),
      background var(--transition-interactive),
      box-shadow var(--transition-interactive);
  }

  .task-card:hover {
    border-color: var(--task-color);
    background: color-mix(in oklab, var(--task-color) 5%, var(--color-surface));
  }

  .task-card--selected {
    border-color: var(--task-color);
    background: color-mix(in oklab, var(--task-color) 8%, var(--color-surface));
    box-shadow: 0 0 0 1px var(--task-color);
  }

  .task-card-inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .task-tier-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--task-color);
    margin-bottom: var(--space-1);
  }

  .task-name {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.3;
  }

  .task-tier-label {
    font-size: var(--text-xs);
    font-weight: 500;
  }

  .detail-panel-wrapper {
    position: sticky;
    top: 120px;
  }

  .detail-panel {
    padding: var(--space-6);
  }

  .detail-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-5);
  }

  .detail-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.3;
  }

  .detail-tier-badge {
    flex-shrink: 0;
    display: inline-flex;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 600;
    white-space: nowrap;
  }

  .detail-section {
    padding: var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    margin-bottom: var(--space-3);
    background: var(--color-surface-offset);
  }

  .detail-section--highlight {
    background: var(--color-primary-highlight);
    border-color: color-mix(in oklab, var(--color-primary) 20%, transparent);
  }

  .detail-section--warning {
    background: var(--color-warning-highlight);
    border-color: color-mix(in oklab, var(--color-warning) 20%, transparent);
  }

  .detail-label {
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-faint);
    margin-bottom: var(--space-2);
    max-width: none;
  }

  .detail-text {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.7;
    max-width: none;
  }

  .detail-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-12) var(--space-8);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-faint);
    text-align: center;
  }

  .detail-empty p {
    font-size: var(--text-sm);
    max-width: 32ch;
    margin: 0;
  }

  /* ── Calculator ────────────────────────────────────────── */
  .calculator-section {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .calculator-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    align-items: start;
  }

  @media (max-width: 768px) {
    .calculator-layout { grid-template-columns: 1fr; }
  }

  .calc-inputs {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .calc-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .calc-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text);
  }

  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .slider-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-primary);
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--color-surface-offset);
    outline: none;
    cursor: pointer;
    border: 1px solid var(--color-border);
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-interactive), box-shadow var(--transition-interactive);
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: var(--shadow-md);
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: var(--shadow-sm);
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs);
    color: var(--color-text-faint);
  }

  /* Result card */
  .calc-result {
    position: sticky;
    top: 120px;
  }

  .result-card {
    padding: var(--space-6);
  }

  .result-label {
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-faint);
    margin-bottom: var(--space-3);
    max-width: none;
  }

  .result-tier {
    margin-bottom: var(--space-4);
  }

  .result-tier-name {
    display: block;
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: var(--space-1);
  }

  .result-tier-cost {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .result-reasoning {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.7;
    margin-bottom: var(--space-5);
    padding: var(--space-4);
    background: var(--color-surface-offset);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    max-width: none;
  }

  .result-examples-label {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-faint);
    margin-bottom: var(--space-2);
    max-width: none;
  }

  .result-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .result-chip {
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-text-muted);
    background: var(--color-surface-offset);
    border: 1px solid var(--color-border);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
  }

  /* ── Rules ─────────────────────────────────────────────── */
  .rules-title { margin-bottom: var(--space-2); }
  .rules-desc { margin-bottom: var(--space-8); }

  .rules-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    list-style: none;
  }

  .rule-item {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: var(--space-4);
    align-items: start;
    padding: var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition:
      border-color var(--transition-interactive),
      box-shadow var(--transition-interactive);
  }

  .rule-item:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }

  .rule-number {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
    padding-top: 0.1em;
  }

  .rule-text {
    font-size: var(--text-base);
    color: var(--color-text);
    line-height: 1.6;
    max-width: none;
  }

  /* ── CTA ───────────────────────────────────────────────── */
  .cta-section {
    padding: clamp(var(--space-12), 6vw, var(--space-20)) 0;
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
  }

  .cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-8);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .cta-desc {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-width: 45ch;
  }

  .cta-btn {
    flex-shrink: 0;
    padding: var(--space-3) var(--space-8);
    font-size: var(--text-base);
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .cta-inner { flex-direction: column; align-items: flex-start; }
  }
</style>