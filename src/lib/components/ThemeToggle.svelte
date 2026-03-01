<script lang="ts">
  import { getTheme, toggleTheme, isDark } from '$lib/stores/theme.svelte';
</script>

<button
  class="theme-toggle"
  onclick={toggleTheme}
  aria-label={isDark() ? 'Switch to light mode' : 'Switch to dark mode'}
  title={isDark() ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if isDark()}
    <!-- Sun icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    transition:
      background var(--transition-interactive),
      color var(--transition-interactive),
      transform var(--transition-interactive);
  }

  .theme-toggle:hover {
    background: var(--color-surface-offset);
    color: var(--color-text);
    transform: scale(1.05);
  }

  .theme-toggle:active {
    transform: scale(0.95);
  }
</style>
