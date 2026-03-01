<script lang="ts">
  import type { OpenRouterModel, PlaygroundResponse } from '$lib/types';
  import { fade, fly } from 'svelte/transition';
  import { marked } from 'marked';

  const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
  const MAX_MODELS = 4;

  // Configure marked for safe rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  function renderMarkdown(text: string): string {
    try {
      return marked.parse(text) as string;
    } catch {
      return text.replace(/\n/g, '<br>');
    }
  }

  // State
  let apiKey = $state('');
  let prompt = $state('');
  let selectedModelIds = $state<string[]>([]);
  let isLoading = $state(false);
  let responses = $state<PlaygroundResponse[]>([]);
  let models = $state<OpenRouterModel[]>([]);
  let modelsLoading = $state(false);
  let modelsError = $state('');
  let errorMessage = $state('');
  let hasTriggeredFetch = $state(false);
  let modelSearchQuery = $state('');
  let showModelPicker = $state(false);

  // Filtered models based on search
  let filteredModels = $derived(
    modelSearchQuery.trim()
      ? models.filter(m =>
          m.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
          m.id.toLowerCase().includes(modelSearchQuery.toLowerCase())
        )
      : models
  );

  // Selected model objects
  let selectedModels = $derived(
    selectedModelIds
      .map(id => models.find(m => m.id === id))
      .filter((m): m is OpenRouterModel => !!m)
  );

  // Demo responses for multi-model
  const DEMO_RESPONSES: Record<string, string> = {
    default: `This is a **demo response** showing how the Playground works.\n\nAdd your OpenRouter API key above to make real API calls to any available model.\n\n### How it works\n\nThe Playground connects to [OpenRouter](https://openrouter.ai), which gives you access to hundreds of models:\n\n- **Anthropic** — Claude family\n- **OpenAI** — GPT family\n- **Google** — Gemini family\n- **Meta** — Llama family\n- **And many more**\n\nGet your free API key at [openrouter.ai/keys](https://openrouter.ai/keys).`,
  };

  function getDemoForModel(modelId: string): string {
    const name = getModelName(modelId);
    return `This is a **demo response** from ${name}.\n\nConnect your OpenRouter API key to see real responses. With multiple models selected, each one runs **in parallel** so you can compare outputs side by side.\n\n### What you'd see here\n\n- The model's actual interpretation of your prompt\n- Its unique style, formatting, and reasoning approach\n- Response time and token usage\n\n> Try it with a real key — the differences between models are often surprising.`;
  }

  // Fetch available models from OpenRouter
  async function loadModels() {
    modelsLoading = true;
    modelsError = '';
    try {
      const res = await fetch(`${OPENROUTER_BASE}/models`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      models = (data.data as OpenRouterModel[])
        .filter(m => m.id && m.name)
        .sort((a, b) => a.name.localeCompare(b.name));
      if (models.length > 0 && selectedModelIds.length === 0) {
        // Default to a couple of popular models
        const preferred = [
          'anthropic/claude-sonnet-4',
          'openai/gpt-4.1',
          'google/gemini-2.5-pro',
        ];
        const found = preferred
          .map(p => models.find(m => m.id.includes(p.split('/').pop()!)))
          .filter((m): m is OpenRouterModel => !!m);
        selectedModelIds = found.length > 0
          ? found.slice(0, 2).map(m => m.id)
          : [models[0].id];
      }
    } catch {
      modelsError = 'Could not load models from OpenRouter. Check your connection.';
      models = [
        { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4' },
        { id: 'openai/gpt-4.1', name: 'GPT-4.1' },
        { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
        { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1' },
        { id: 'x-ai/grok-3', name: 'Grok 3' },
      ];
      selectedModelIds = [models[0].id, models[1].id];
    } finally {
      modelsLoading = false;
    }
  }

  // Load models on mount
  $effect(() => {
    if (!hasTriggeredFetch) {
      hasTriggeredFetch = true;
      loadModels();
    }
  });

  function getModelName(id: string): string {
    return models.find(m => m.id === id)?.name ?? id.split('/').pop() ?? id;
  }

  function toggleModel(id: string) {
    if (selectedModelIds.includes(id)) {
      selectedModelIds = selectedModelIds.filter(m => m !== id);
    } else if (selectedModelIds.length < MAX_MODELS) {
      selectedModelIds = [...selectedModelIds, id];
    }
  }

  function removeModel(id: string) {
    selectedModelIds = selectedModelIds.filter(m => m !== id);
  }

  async function runPlayground() {
    if (!prompt.trim()) return;
    if (selectedModelIds.length === 0) return;

    isLoading = true;
    errorMessage = '';
    responses = [];

    if (!apiKey.trim()) {
      // Demo mode — simulate parallel responses
      const delays = selectedModelIds.map(() => 600 + Math.random() * 600);
      const maxDelay = Math.max(...delays);
      await new Promise(r => setTimeout(r, maxDelay));

      responses = selectedModelIds.map((id, i) => ({
        model: id,
        modelName: getModelName(id),
        content: getDemoForModel(id),
        responseTime: Math.round(delays[i]),
        isDemo: true,
      }));
      isLoading = false;
      return;
    }

    // Real API calls — run in parallel
    const promises = selectedModelIds.map(async (modelId) => {
      const startTime = Date.now();
      try {
        const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://model-quest.app',
            'X-Title': 'Model Quest',
          },
          body: JSON.stringify({
            model: modelId,
            messages: [{ role: 'user', content: prompt.trim() }],
            max_tokens: 1024,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          return {
            model: modelId,
            modelName: getModelName(modelId),
            content: '',
            responseTime: Date.now() - startTime,
            isDemo: false,
            error: data.error?.message ?? `API error ${res.status}`,
          } satisfies PlaygroundResponse;
        }

        const content = data.choices?.[0]?.message?.content ?? '';

        return {
          model: modelId,
          modelName: getModelName(modelId),
          content,
          responseTime: Date.now() - startTime,
          isDemo: false,
        } satisfies PlaygroundResponse;
      } catch (e) {
        return {
          model: modelId,
          modelName: getModelName(modelId),
          content: '',
          responseTime: Date.now() - startTime,
          isDemo: false,
          error: e instanceof Error ? e.message : 'Request failed',
        } satisfies PlaygroundResponse;
      }
    });

    try {
      responses = await Promise.all(promises);
    } catch {
      errorMessage = 'One or more requests failed. Check your API key and try again.';
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      runPlayground();
    }
  }

  // Grid columns based on response count
  let gridCols = $derived(
    responses.length === 1 ? '1fr' :
    responses.length === 2 ? '1fr 1fr' :
    responses.length === 3 ? '1fr 1fr 1fr' :
    '1fr 1fr'
  );
</script>

<div class="playground">
  <div class="playground-config">
    <!-- API Key input -->
    <div class="config-field">
      <label for="api-key" class="config-label">
        OpenRouter API Key
        <span class="config-hint">Optional — stored in memory only</span>
      </label>
      <div class="api-key-wrapper">
        <input
          type="password"
          id="api-key"
          class="input"
          bind:value={apiKey}
          placeholder="sk-or-v1-..."
          autocomplete="off"
          spellcheck="false"
        />
        {#if !apiKey}
          <div class="api-key-badge">Demo mode</div>
        {/if}
      </div>
      {#if !apiKey}
        <p class="api-key-note">
          Without a key, you'll see demo responses.
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">Get a free key →</a>
        </p>
      {/if}
    </div>

    <!-- Model selector -->
    <div class="config-field">
      <label class="config-label">
        Models
        {#if modelsLoading}
          <span class="config-hint">Loading models…</span>
        {:else if models.length > 0}
          <span class="config-hint">{selectedModelIds.length}/{MAX_MODELS} selected · {models.length} available</span>
        {/if}
      </label>
      {#if modelsLoading}
        <div class="skeleton" style="height: 44px; border-radius: var(--radius-md);"></div>
      {:else}
        <!-- Selected model chips -->
        <div class="selected-models">
          {#each selectedModels as model (model.id)}
            <button
              class="model-chip"
              onclick={() => removeModel(model.id)}
              title="Remove {model.name}"
              transition:fly={{ x: -8, duration: 180 }}
            >
              <span class="model-chip-name">{model.name}</span>
              <svg class="model-chip-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          {/each}
          {#if selectedModelIds.length < MAX_MODELS}
            <button
              class="add-model-btn"
              onclick={() => { showModelPicker = !showModelPicker; modelSearchQuery = ''; }}
              aria-expanded={showModelPicker}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add model
            </button>
          {/if}
        </div>

        <!-- Model picker dropdown -->
        {#if showModelPicker}
          <div class="model-picker" transition:fly={{ y: -8, duration: 180 }}>
            <input
              type="text"
              class="input model-search"
              bind:value={modelSearchQuery}
              placeholder="Search models…"
              autofocus
            />
            <div class="model-list">
              {#each filteredModels.slice(0, 50) as model (model.id)}
                {@const isSelected = selectedModelIds.includes(model.id)}
                <button
                  class="model-option"
                  class:model-option--selected={isSelected}
                  onclick={() => { toggleModel(model.id); if (!isSelected && selectedModelIds.length >= MAX_MODELS) showModelPicker = false; }}
                  disabled={!isSelected && selectedModelIds.length >= MAX_MODELS}
                >
                  <span class="model-option-check" aria-hidden="true">
                    {#if isSelected}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    {/if}
                  </span>
                  <span class="model-option-name">{model.name}</span>
                  <span class="model-option-id">{model.id}</span>
                </button>
              {/each}
              {#if filteredModels.length === 0}
                <p class="model-list-empty">No models match your search</p>
              {/if}
              {#if filteredModels.length > 50}
                <p class="model-list-more">Showing 50 of {filteredModels.length} — refine your search</p>
              {/if}
            </div>
          </div>
        {/if}
      {/if}
      {#if modelsError}
        <p class="config-error">{modelsError} Showing fallback list.</p>
      {/if}
    </div>
  </div>

  <!-- Prompt area -->
  <div class="prompt-section">
    <label for="playground-prompt" class="config-label">Your prompt</label>
    <textarea
      id="playground-prompt"
      class="input prompt-textarea"
      bind:value={prompt}
      placeholder="Ask anything — try 'Explain recursion with a real-world analogy' or 'Write a haiku about distributed systems'…"
      rows="4"
      onkeydown={handleKeydown}
    ></textarea>
    <div class="prompt-footer">
      <span class="prompt-hint">
        {#if selectedModelIds.length > 1}
          Running {selectedModelIds.length} models in parallel · Ctrl+Enter
        {:else}
          Ctrl+Enter to run
        {/if}
      </span>
      <button
        class="btn btn-primary run-btn"
        onclick={runPlayground}
        disabled={isLoading || !prompt.trim() || selectedModelIds.length === 0}
      >
        {#if isLoading}
          <span class="spinner" aria-hidden="true"></span>
          Running…
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Run{selectedModelIds.length > 1 ? ` (${selectedModelIds.length})` : ''}
        {/if}
      </button>
    </div>
  </div>

  <!-- Error -->
  {#if errorMessage}
    <div class="playground-error" transition:fly={{ y: -8, duration: 200 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      {errorMessage}
    </div>
  {/if}

  <!-- Loading skeleton -->
  {#if isLoading}
    <div class="response-loading" transition:fade={{ duration: 150 }}>
      <div class="response-grid" style="grid-template-columns: {gridCols};">
        {#each selectedModelIds as id (id)}
          <div class="response-skeleton-card">
            <div class="response-skeleton-header">
              <div class="skeleton" style="height: 14px; width: 50%;"></div>
            </div>
            <div class="response-skeleton-body">
              <div class="skeleton" style="height: 14px; margin-bottom: var(--space-2);"></div>
              <div class="skeleton" style="height: 14px; margin-bottom: var(--space-2);"></div>
              <div class="skeleton" style="height: 14px; width: 70%;"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Responses -->
  {#if responses.length > 0 && !isLoading}
    <div class="response-grid" style="grid-template-columns: {gridCols};" transition:fly={{ y: 16, duration: 280 }}>
      {#each responses as resp (resp.model)}
        <div class="response-card">
          <div class="response-header">
            <span class="response-model-name">{resp.modelName}</span>
            <div class="response-meta">
              {#if resp.isDemo}
                <span class="badge badge--primary">Demo</span>
              {/if}
              <span class="response-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {(resp.responseTime / 1000).toFixed(1)}s
              </span>
            </div>
          </div>
          <div class="response-content">
            {#if resp.error}
              <p class="response-error">{resp.error}</p>
            {:else}
              <div class="markdown-body">
                {@html renderMarkdown(resp.content)}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Empty state -->
  {#if responses.length === 0 && !isLoading && !errorMessage}
    <div class="playground-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <p>Select up to {MAX_MODELS} models, type a prompt, and click Run to compare responses side by side</p>
    </div>
  {/if}
</div>

<style>
  .playground {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .playground-config {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  @media (max-width: 640px) {
    .playground-config { grid-template-columns: 1fr; }
  }

  .config-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .config-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text);
  }

  .config-hint {
    font-size: var(--text-xs);
    font-weight: 400;
    color: var(--color-text-faint);
  }

  .api-key-wrapper {
    position: relative;
  }

  .api-key-badge {
    position: absolute;
    right: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-text-faint);
    background: var(--color-surface-offset);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    pointer-events: none;
  }

  .api-key-note {
    font-size: var(--text-xs);
    color: var(--color-text-faint);
    max-width: none;
  }

  .api-key-note a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }
  .api-key-note a:hover { text-decoration: underline; }

  .config-error {
    font-size: var(--text-xs);
    color: var(--color-error);
    max-width: none;
  }

  /* ── Model selection ────────────────────────────────────── */
  .selected-models {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    align-items: center;
  }

  .model-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--color-primary-highlight);
    border: 1px solid color-mix(in oklab, var(--color-primary) 25%, transparent);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-primary);
    cursor: pointer;
    transition:
      background var(--transition-interactive),
      border-color var(--transition-interactive);
  }

  .model-chip:hover {
    background: color-mix(in oklab, var(--color-primary) 15%, var(--color-surface));
    border-color: var(--color-primary);
  }

  .model-chip-name {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .model-chip-x {
    flex-shrink: 0;
    opacity: 0.6;
    transition: opacity var(--transition-interactive);
  }

  .model-chip:hover .model-chip-x {
    opacity: 1;
  }

  .add-model-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-text-muted);
    cursor: pointer;
    transition:
      border-color var(--transition-interactive),
      color var(--transition-interactive),
      background var(--transition-interactive);
  }

  .add-model-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-highlight);
  }

  /* ── Model picker dropdown ─────────────────────────────── */
  .model-picker {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  .model-search {
    border: none;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    font-size: var(--text-sm);
  }

  .model-list {
    max-height: 260px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .model-option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text);
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid color-mix(in oklab, var(--color-border) 50%, transparent);
    transition:
      background var(--transition-interactive);
  }

  .model-option:hover:not(:disabled) {
    background: var(--color-surface-offset);
  }

  .model-option:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .model-option--selected {
    background: var(--color-primary-highlight);
  }

  .model-option-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-primary);
    transition:
      border-color var(--transition-interactive),
      background var(--transition-interactive);
  }

  .model-option--selected .model-option-check {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }

  .model-option-name {
    font-weight: 500;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .model-option-id {
    font-size: var(--text-xs);
    font-family: var(--font-mono);
    color: var(--color-text-faint);
    flex-shrink: 0;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .model-list-empty,
  .model-list-more {
    padding: var(--space-4);
    text-align: center;
    font-size: var(--text-xs);
    color: var(--color-text-faint);
    margin: 0;
  }

  /* ── Prompt ──────────────────────────────────────────────── */
  .prompt-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .prompt-textarea {
    min-height: 100px;
    resize: vertical;
    font-size: var(--text-base);
  }

  .prompt-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .prompt-hint {
    font-size: var(--text-xs);
    color: var(--color-text-faint);
  }

  .run-btn {
    gap: var(--space-2);
    min-width: 130px;
    justify-content: center;
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .spinner { animation: none; }
  }

  .playground-error {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: var(--color-error-highlight);
    border: 1px solid color-mix(in oklab, var(--color-error) 30%, transparent);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--color-error);
  }

  /* ── Response grid ──────────────────────────────────────── */
  .response-loading {
    margin-top: var(--space-2);
  }

  .response-grid {
    display: grid;
    gap: var(--space-4);
    align-items: start;
  }

  @media (max-width: 768px) {
    .response-grid {
      grid-template-columns: 1fr !important;
    }
  }

  .response-skeleton-card {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    overflow: hidden;
  }

  .response-skeleton-header {
    padding: var(--space-3) var(--space-5);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface-offset);
  }

  .response-skeleton-body {
    padding: var(--space-5);
  }

  .response-card {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .response-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-5);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface-offset);
    flex-shrink: 0;
  }

  .response-model-name {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text);
  }

  .response-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .response-time {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    font-family: var(--font-mono);
    color: var(--color-text-faint);
  }

  .response-content {
    padding: var(--space-5);
    font-size: var(--text-sm);
    line-height: 1.7;
    color: var(--color-text);
    max-width: none;
    overflow-x: auto;
    flex: 1;
  }

  .response-error {
    color: var(--color-error);
    max-width: none;
  }

  /* ── Markdown body styles ───────────────────────────────── */
  .markdown-body :global(h1),
  .markdown-body :global(h2),
  .markdown-body :global(h3),
  .markdown-body :global(h4) {
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--color-text);
    margin: var(--space-4) 0 var(--space-2) 0;
    line-height: 1.3;
  }

  .markdown-body :global(h1) { font-size: var(--text-lg); }
  .markdown-body :global(h2) { font-size: var(--text-base); }
  .markdown-body :global(h3) { font-size: var(--text-sm); font-weight: 700; }

  .markdown-body :global(p) {
    margin: 0 0 var(--space-3) 0;
    max-width: none;
  }

  .markdown-body :global(p:last-child) {
    margin-bottom: 0;
  }

  .markdown-body :global(strong) {
    font-weight: 600;
    color: var(--color-text);
  }

  .markdown-body :global(em) {
    font-style: italic;
  }

  .markdown-body :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-offset);
    padding: 0.15em 0.4em;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
  }

  .markdown-body :global(pre) {
    background: var(--color-surface-offset);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    overflow-x: auto;
    margin: var(--space-3) 0;
    font-size: var(--text-xs);
    line-height: 1.6;
  }

  .markdown-body :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
  }

  .markdown-body :global(ul),
  .markdown-body :global(ol) {
    margin: var(--space-2) 0 var(--space-3) 0;
    padding-left: var(--space-6);
  }

  .markdown-body :global(li) {
    margin-bottom: var(--space-1);
  }

  .markdown-body :global(blockquote) {
    margin: var(--space-3) 0;
    padding: var(--space-3) var(--space-4);
    border-left: 3px solid var(--color-primary);
    background: var(--color-primary-highlight);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    color: var(--color-text-muted);
  }

  .markdown-body :global(blockquote p) {
    margin-bottom: 0;
  }

  .markdown-body :global(a) {
    color: var(--color-primary);
    text-decoration: none;
  }

  .markdown-body :global(a:hover) {
    text-decoration: underline;
  }

  .markdown-body :global(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: var(--space-4) 0;
  }

  .markdown-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-xs);
    margin: var(--space-3) 0;
  }

  .markdown-body :global(th),
  .markdown-body :global(td) {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    text-align: left;
  }

  .markdown-body :global(th) {
    background: var(--color-surface-offset);
    font-weight: 600;
  }

  /* ── Empty state ────────────────────────────────────────── */
  .playground-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    padding: var(--space-12) var(--space-8);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-faint);
    text-align: center;
  }

  .playground-empty p {
    font-size: var(--text-sm);
    max-width: 40ch;
    margin: 0;
  }
</style>

