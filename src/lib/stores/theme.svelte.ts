// theme.svelte.ts — Svelte 5 rune-based theme store

let currentTheme = $state<'light' | 'dark'>(
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);

export function getTheme(): 'light' | 'dark' {
  return currentTheme;
}

export function toggleTheme(): void {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }
}

export function isDark(): boolean {
  return currentTheme === 'dark';
}
