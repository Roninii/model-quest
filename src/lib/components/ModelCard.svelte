<script lang="ts">
  import type { Model } from '$lib/types';

  interface Props {
    model: Model;
  }

  let { model }: Props = $props();
</script>

<div class="model-card">
  <div class="model-header">
    <h3 class="model-name">{model.displayName}</h3>
    <span class="model-provider">{model.provider}</span>
  </div>
  <p class="model-description">{model.description}</p>
  <div class="model-tags">
    {#each model.tags as tag}
      <span class="model-tag">{tag}</span>
    {/each}
  </div>
</div>

<style>
  .model-card {
    padding: var(--space-4);
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    transition:
      box-shadow var(--transition-interactive),
      border-color var(--transition-interactive);
  }

  .model-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-border-hover);
  }

  .model-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
  }

  .model-name {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
  }

  .model-provider {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    font-weight: 500;
  }

  .model-description {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin: 0 0 var(--space-3);
  }

  .model-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  .model-tag {
    font-size: var(--text-xs);
    font-weight: 500;
    padding: 2px var(--space-2);
    border-radius: var(--radius-full);
    background: var(--color-surface-offset);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }
</style>
