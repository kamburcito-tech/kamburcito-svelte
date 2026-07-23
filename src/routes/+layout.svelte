<script>
  import { onMount } from 'svelte';

  import '../styles/00-global.css';
  import '../styles/01-header-footer.css';
  import '../styles/02-components.css';
  import '../styles/80-animations.css';

  let { children } = $props();

  let mobileMenuOpen = $state(false);
  let theme = $state('dark');

  onMount(() => {
    theme =
      document.documentElement.dataset.theme === 'light'
        ? 'light'
        : 'dark';
  });

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    localStorage.setItem('kamburcito-theme', theme);
  }

</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" sizes="any" />

  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/favicon-32x32.png"
  />

  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/favicon-16x16.png"
  />

  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/apple-touch-icon.png"
  />

  <link rel="manifest" href="/site.webmanifest" />

  <meta name="theme-color" content="#030408" />
</svelte:head>

<header class="site-header">
  <div class="wide-container nav">
    <a
  href="/"
  class="brand"
  aria-label="Kamburcito Studio home"
  onclick={closeMobileMenu}
>
  <span class="brand-name">kamburcito</span><span class="brand-studio">studio</span>
</a>

    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="/work">Work</a>
      <a href="/pricing">Pricing</a>
      <a href="/get-started">Get a Quote</a>
    </nav>

    <div class="nav-actions">
     <button
    type="button"
    class="theme-toggle"
    aria-label={theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'}
    title={theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'}
    onclick={toggleTheme}
  >
    {#if theme === 'dark'}
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.42 1.42" />
        <path d="m17.65 17.65 1.42 1.42" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.35 17.65-1.42 1.42" />
        <path d="m19.07 4.93-1.42 1.42" />
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    {/if}
  </button>
      <button
        type="button"
        class:open={mobileMenuOpen}
        class="mobile-menu-toggle"
        aria-label={mobileMenuOpen
          ? 'Close navigation menu'
          : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <span></span>
        <span></span>
      </button>

      <a
        href="/get-started"
        class="mini-cta"
        onclick={closeMobileMenu}
      >
        Start
      </a>
    </div>
  </div>

  {#if mobileMenuOpen}
    <nav
      id="mobile-navigation"
      class="mobile-menu"
      aria-label="Mobile navigation"
    >
      <a href="/" onclick={closeMobileMenu}>Home</a>
      <a href="/work" onclick={closeMobileMenu}>Work</a>
      <a href="/pricing" onclick={closeMobileMenu}>Pricing</a>
      <a href="/get-started" onclick={closeMobileMenu}>Get a Quote</a>
    </nav>
  {/if}
</header>

{@render children()}