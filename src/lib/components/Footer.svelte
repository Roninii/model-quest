<footer class="footer">
  <div class="container--wide footer-inner">
    <div class="footer-brand">
      <a href="/" class="footer-logo">Model Quest</a>
      <p class="footer-tagline">Find the right AI model for every task.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer navigation">
      <a href="/">Benchmarks</a>
      <a href="/picker">Model Picker</a>
    </nav>
  </div>
</footer>

<style>
  .footer {
    margin-top: auto;
    padding: var(--space-8) 0;
    border-top: 1px solid var(--color-border);
    background: var(--color-surface-offset);
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .footer-logo {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-lg);
    color: var(--color-text);
    text-decoration: none;
  }

  .footer-logo:hover {
    color: var(--color-primary);
  }

  .footer-tagline {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
  }

  .footer-nav {
    display: flex;
    gap: var(--space-6);
    align-items: center;
  }

  .footer-nav a {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-interactive);
  }

  .footer-nav a:hover {
    color: var(--color-text);
  }

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
