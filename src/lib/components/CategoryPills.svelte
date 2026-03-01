<script lang="ts">
  import type { CategoryId } from '$lib/types';
  import { benchmarks, CATEGORY_ORDER } from '$lib/data/benchmarks';

  interface Props {
    selected: CategoryId;
    onSelect: (id: CategoryId) => void;
  }

  let { selected, onSelect }: Props = $props();
</script>

<div class="pills-wrapper" role="tablist" aria-label="Benchmark categories">
  {#each CATEGORY_ORDER as catId}
    {@const cat = benchmarks[catId]}
    <button
      class="pill"
      class:pill--active={selected === catId}
      role="tab"
      aria-selected={selected === catId}
      id="tab-{catId}"
      aria-controls="panel-{catId}"
      onclick={() => onSelect(catId as CategoryId)}
    >
      <span class="pill-icon" aria-hidden="true">{@html cat.icon}</span>
      <span class="pill-label">{cat.label}</span>
    </button>
  {/each}
</div>

<style>
  .pills-wrapper {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    padding: var(--space-1);
    background: var(--color-surface-offset);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-muted);
    cursor: pointer;
    border: 1px solid transparent;
    transition:
      color var(--transition-interactive),
      background var(--transition-interactive),
      border-color var(--transition-interactive),
      box-shadow var(--transition-interactive);
    white-space: nowrap;
  }

  .pill:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .pill--active {
    background: var(--color-surface-2);
    color: var(--color-primary);
    border-color: var(--color-border);
    box-shadow: var(--shadow-sm);
  }

  .pill--active:hover {
    color: var(--color-primary-hover);
    background: var(--color-surface-2);
  }

  .pill-icon {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    color: currentColor;
  }

  @media (max-width: 640px) {
    .pills-wrapper {
      gap: var(--space-1);
      padding: var(--space-1);
    }

    .pill {
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .pill-icon { display: none; }
  }
</style>

