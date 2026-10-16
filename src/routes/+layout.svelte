<script>
  import '@fontsource-variable/cormorant-garamond';
  import '@fontsource-variable/manrope';

  import '../styles/00-global.css';
  import '../styles/01-header-footer.css';
  import '../styles/02-components.css';
  import '../styles/80-animations.css';

  let { children } = $props();

  let mobileMenuOpen = $state(false);

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('kamburcito-theme', theme);
    } catch {
      // Theme still works when storage is unavailable.
    }
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
        <button
          type="button"
          class="theme-toggle"
          aria-label="Toggle light and dark mode"
          title="Toggle light and dark mode"
          onclick={toggleTheme}
        >
          <svg class="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>
          </svg>
          <svg class="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.2 15.6A8.5 8.5 0 0 1 8.4 3.8 8.5 8.5 0 1 0 20.2 15.6Z"></path>
          </svg>
        </button>

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