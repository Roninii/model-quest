<script lang="ts">
  import { page } from '$app/stores';
  import ThemeToggle from './ThemeToggle.svelte';

  let mobileOpen = $state(false);

  const navLinks = [
    { href: '#/', label: 'Benchmarks', path: '/' },
    { href: '#/picker', label: 'Model Picker', path: '/picker' },
  ];

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<header class="nav-header">
  <div class="nav-inner container--wide">
    <!-- Logo -->
    <a href="#/" class="nav-logo" aria-label="Model Quest home" onclick={closeMobile}>
      <svg class="nav-logo-icon" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Ears -->
        <path d="M7 3 L4 13 L13 11 Z" fill="var(--color-primary)"/>
        <path d="M25 3 L28 13 L19 11 Z" fill="var(--color-primary)"/>
        <path d="M7.8 6 L6 12 L12 10.5 Z" fill="var(--color-primary-light, #f5a060)"/>
        <path d="M24.2 6 L26 12 L20 10.5 Z" fill="var(--color-primary-light, #f5a060)"/>
        <!-- Head -->
        <ellipse cx="16" cy="15.5" rx="11" ry="9.5" fill="var(--color-primary)"/>
        <!-- Muzzle -->
        <ellipse cx="16" cy="19" rx="6.5" ry="5" fill="var(--color-fox-muzzle, #fff5eb)"/>
        <!-- Eyes -->
        <circle cx="11.5" cy="14.5" r="2" fill="var(--color-fox-eye, #1a1a1a)"/>
        <circle cx="20.5" cy="14.5" r="2" fill="var(--color-fox-eye, #1a1a1a)"/>
        <circle cx="12.2" cy="13.8" r="0.7" fill="white"/>
        <circle cx="21.2" cy="13.8" r="0.7" fill="white"/>
        <!-- Nose -->
        <ellipse cx="16" cy="17.5" rx="1.8" ry="1.2" fill="var(--color-fox-eye, #1a1a1a)"/>
        <!-- Smile -->
        <path d="M14 19 Q16 21.5 18 19" stroke="var(--color-primary-hover, #c06020)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
        <!-- Shield -->
        <path d="M2 20 L2 25 Q2 29 6.5 30.5 Q11 29 11 25 L11 20 Z" fill="var(--color-primary-hover, #d06018)" stroke="var(--color-primary-hover, #a04810)" stroke-width="0.7"/>
        <line x1="6.5" y1="21" x2="6.5" y2="28" stroke="var(--color-fox-muzzle, #fff5eb)" stroke-width="1" opacity="0.6"/>
        <line x1="3.5" y1="24.5" x2="9.5" y2="24.5" stroke="var(--color-fox-muzzle, #fff5eb)" stroke-width="1" opacity="0.6"/>
        <!-- Sword -->
        <path d="M24 11 L27 25" stroke="var(--color-fox-blade, #b0b0b0)" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M24.5 12 L26.8 23" stroke="var(--color-fox-blade-highlight, #d8d8d8)" stroke-width="0.6" stroke-linecap="round"/>
        <line x1="23" y1="24" x2="28" y2="23" stroke="var(--color-primary-hover, #c06020)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M25.5 25.5 L26.5 29" stroke="var(--color-primary-hover, #a05010)" stroke-width="2" stroke-linecap="round"/>
        <circle cx="26.8" cy="29.5" r="1" fill="var(--color-primary-hover, #c06020)"/>
      </svg>
      <span class="nav-logo-text">
        Model <span class="nav-logo-accent">Quest</span>
      </span>
    </a>

    <!-- Desktop nav links -->
    <nav class="nav-links" aria-label="Main navigation">
      {#each navLinks as link}
        <a
          href={link.href}
          class="nav-link"
          class:nav-link--active={$page.url.pathname === link.path}
          aria-current={$page.url.pathname === link.path ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right side -->
    <div class="nav-actions">
      <ThemeToggle />

      <!-- Mobile hamburger -->
      <button
        class="nav-hamburger"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onclick={() => (mobileOpen = !mobileOpen)}
      >
        {#if mobileOpen}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        {:else}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <nav class="nav-mobile" aria-label="Mobile navigation">
      {#each navLinks as link}
        <a
          href={link.href}
          class="nav-mobile-link"
          class:nav-mobile-link--active={$page.url.pathname === link.path}
          onclick={closeMobile}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  {/if}
</header>

<style>
  .nav-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: color-mix(in oklab, var(--color-bg) 92%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    transition: background var(--transition-interactive);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    height: 60px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-logo-text {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-lg);
    color: var(--color-text);
    letter-spacing: -0.01em;
    line-height: 1;
  }

  .nav-logo-accent {
    color: var(--color-primary);
    font-style: italic;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: var(--space-6);
    flex: 1;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    transition:
      color var(--transition-interactive),
      background var(--transition-interactive);
  }

  .nav-link:hover {
    color: var(--color-text);
    background: var(--color-surface-offset);
  }

  .nav-link--active {
    color: var(--color-primary);
    background: var(--color-primary-highlight);
  }

  .nav-link--active:hover {
    color: var(--color-primary-hover);
    background: var(--color-primary-highlight);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
  }

  .nav-hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    transition: background var(--transition-interactive), color var(--transition-interactive);
  }

  .nav-hamburger:hover {
    background: var(--color-surface-offset);
    color: var(--color-text);
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-border);
    padding: var(--space-2);
    background: var(--color-bg);
  }

  .nav-mobile-link {
    display: block;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-interactive), background var(--transition-interactive);
  }

  .nav-mobile-link:hover,
  .nav-mobile-link--active {
    color: var(--color-primary);
    background: var(--color-primary-highlight);
  }

  @media (max-width: 640px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
  }
</style>

