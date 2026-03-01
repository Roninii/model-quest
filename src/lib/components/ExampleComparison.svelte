<script lang="ts">
  import type { BenchmarkExample } from '$lib/types';
  import { MODELS } from '$lib/data/benchmarks';
  import { marked } from 'marked';

  interface Props {
    example: BenchmarkExample;
    featured?: boolean;
  }

  let { example, featured = false }: Props = $props();

  // Strip leading/trailing whitespace + normalize indentation
  function formatResponse(raw: string): string {
    const lines = raw.split('\n');
    const trimmed = lines.map(l => l.trimStart());
    return trimmed.join('\n').trim();
  }

  // Detect if response contains markdown
  function isMarkdown(text: string): boolean {
    return /[*#`\[\]_~>|]/.test(text) || /\d+\.\s/.test(text) || /^-\s/m.test(text);
  }

  // Render response as HTML
  function renderResponse(raw: string): string {
    const formatted = formatResponse(raw);
    if (isMarkdown(formatted)) {
      return marked.parse(formatted) as string;
    }
    // Plain text: wrap paragraphs
    return formatted.split('\n\n').map((p: string) => `<p>${p.trim()}</p>`).join('');
  }
</script>

<div class="comparison" class:comparison--featured={featured}>
  <div class="comparison-prompt">
    <span class="comparison-label">Prompt</span>
    <p class="comparison-prompt-text">{example.prompt}</p>
  </div>
  <div class="comparison-responses">
    {#each example.responses as response}
      {@const model = MODELS[response.modelId]}
      {#if model}
        <div class="response-card" class:response-card--winner={response.isWinner}>
          <div class="response-header">
            <span class="response-model">{model.displayName}</span>
            {#if response.isWinner}
              <span class="winner-badge">Best response</span>
            {/if}
          </div>
          <div class="response-body">
            {@html renderResponse(response.text)}
          </div>
          {#if response.notes}
            <p class="response-notes">{response.notes}</p>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .comparison {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .comparison--featured {
    padding: var(--space-6);
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
  }

  .comparison-prompt {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--color-surface-offset);
    border-radius: var(--radius-lg);
    border-left: 3px solid var(--color-primary);
  }

  .comparison-label {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-primary);
  }

  .comparison-prompt-text {
    font-size: var(--text-sm);
    color: var(--color-text);
    margin: 0;
    line-height: 1.6;
  }

  .comparison-responses {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-4);
  }

  .response-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    transition: border-color var(--transition-interactive);
  }

  .response-card--winner {
    border-color: var(--color-primary);
    background: var(--color-primary-tint);
  }

  .response-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .response-model {
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-text);
  }

  .winner-badge {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary);
    background: var(--color-primary-highlight);
    padding: 2px var(--space-2);
    border-radius: var(--radius-full);
  }

  .response-body {
    font-size: var(--text-sm);
    line-height: 1.7;
    color: var(--color-text-secondary);
    flex: 1;
  }

  .response-body :global(p) { margin: 0 0 var(--space-2); }
  .response-body :global(p:last-child) { margin-bottom: 0; }
  .response-body :global(ul), .response-body :global(ol) {
    padding-left: var(--space-4);
    margin: 0 0 var(--space-2);
  }
  .response-body :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-offset);
    padding: 1px 4px;
    border-radius: var(--radius-sm);
  }

  .response-notes {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    font-style: italic;
    margin: 0;
    padding-top: var(--space-2);
    border-top: 1px solid var(--color-border);
  }
</style>
