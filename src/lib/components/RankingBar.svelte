<script lang="ts">
  import type { ModelRanking } from '$lib/types';
  import { MODELS } from '$lib/data/benchmarks';

  interface Props {
    rankings: ModelRanking[];
    animate?: boolean;
  }

  let { rankings, animate = true }: Props = $props();

  let sortedRankings = $derived([...rankings].sort((a, b) => b.score - a.score));

  function getModel(id: string) {
    return MODELS.find(m => m.id === id);
  }

  function getBarWidth(score: number): string {
    // Score is out of 10, map to percentage with slight scaling for visual impact
    return `${(score / 10) * 100}%`;
  }
</script>

<div class="rankings-table">
  {#each sortedRankings as ranking, i}
    {@const model = getModel(ranking.model)}
    {#if model}
      <div class="ranking-row">
        <span class="rank-number" aria-label="Rank {i + 1}">{i + 1}</span>

        <div class="model-info">
          <span class="model-name">{model.name}</span>
        </div>

        <div class="bar-wrapper" aria-label="{model.name} score: {ranking.score} out of 10">
          <div
            class="bar"
            class:bar--animate={animate}
            style="width: {getBarWidth(ranking.score)}; --model-color: var({model.colorVar}); --delay: {i * 80}ms;"
          ></div>
        </div>

        <span class="score-label">{ranking.score}</span>
      </div>
    {/if}
  {/each}
</div>

<style>
  .rankings-table {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .ranking-row {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr auto;
    align-items: center;
    gap: var(--space-4);
  }

  .rank-number {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-text-faint);
    text-align: center;
    line-height: 1;
  }

  .ranking-row:first-child .rank-number {
    color: var(--color-primary);
  }

  .model-info {
    min-width: 0;
  }

  .model-name {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .bar-wrapper {
    position: relative;
    height: 10px;
    background: var(--color-surface-offset);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--model-color, var(--color-primary));
    width: 0;
    transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--delay, 0ms);
  }

  .bar--animate {
    animation: grow-bar 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: var(--delay, 0ms);
  }

  @keyframes grow-bar {
    from { width: 0 !important; }
  }

  .score-label {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text);
    min-width: 2.5ch;
    text-align: right;
  }

  @media (max-width: 500px) {
    .ranking-row {
      grid-template-columns: 1.5rem 1fr auto;
    }

    .bar-wrapper { display: none; }
    .model-name { font-size: var(--text-xs); }
  }

  @media (prefers-reduced-motion: reduce) {
    .bar, .bar--animate {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
