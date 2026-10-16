<script>
  import { afterNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';

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

  afterNavigate(closeMobileMenu);

  function handleMenuKeydown(event) {
    if (mobileMenuOpen && event.key === 'Escape') {
      closeMobileMenu();
      document.querySelector('.mobile-menu-toggle')?.focus();
    }
  }

  function handleMenuResize() {
    if (window.innerWidth > 820) closeMobileMenu();
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

<svelte:window onkeydown={handleMenuKeydown} onresize={handleMenuResize} />

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
        href={resolve('/')}
        class="brand"
        aria-label="Kamburcito Studio home"
        onclick={closeMobileMenu}
      >
        <span class="brand-name">kamburcito</span><span class="brand-studio">studio</span>
      </a>

      <nav class="desktop-nav" aria-label="Main navigation">
        <a href={resolve('/work')}>Work</a>
        <a href={resolve('/pricing')}>Pricing</a>
        <a href={resolve('/get-started')}>Get a Quote</a>
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
          href={resolve('/get-started')}
          class="mini-cta btn-primary"
          aria-label="Start a website project"
          onclick={closeMobileMenu}
        >
          Get Started
        </a>
        <button
          type="button"
          class:open={mobileMenuOpen}
          class="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>

  <nav id="mobile-navigation" class="mobile-menu" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
    <a href={resolve('/')} onclick={closeMobileMenu}>Home</a>
    <a href={resolve('/work')} onclick={closeMobileMenu}>Work</a>
    <a href={resolve('/pricing')} onclick={closeMobileMenu}>Pricing</a>
    <a href={resolve('/get-started')} onclick={closeMobileMenu}>Get Started</a>
  </nav>
</header>

{@render children()}