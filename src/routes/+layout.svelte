<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  let { children } = $props();
</script>

<svelte:head>
  <title>Model Quest — AI Benchmark Comparisons</title>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>

<Nav />

<main id="main-content">
  {#key $page.url.pathname}
    <div in:fly={{ y: 12, duration: 240, delay: 80 }}>
      {@render children()}
    </div>
  {/key}
</main>

<Footer />

<style>
  main {
    min-height: calc(100dvh - 60px);
  }
</style>
