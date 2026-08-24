<script>
  import '@fontsource-variable/cormorant-garamond';
  import '@fontsource-variable/manrope';

  // Keep your other existing imports below.

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
  <div class="nav">
    <div class="wide-container nav-inner">
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
        <!-- theme toggle -->

        <a
          href="/get-started"
          class="mini-cta btn-primary"
          aria-label="Start a website project"
          onclick={closeMobileMenu}
        >
          Get Started
        </a>
      </div>
    </div>
  </div>

  {#if mobileMenuOpen}
    <!-- your existing mobile menu -->
  {/if}
</header>

{@render children()}