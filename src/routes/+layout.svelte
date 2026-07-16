<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<script>
  import './layout.css';

  let { children } = $props();
  let mobileMenuOpen = $state(false);

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<header class="site-header">
  <div class="wide-container nav">
    <a
      href="/"
      class="brand"
      aria-label="Kamburcito Studio home"
      onclick={closeMobileMenu}
    >
      Kamburcito Studio
    </a>

    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="/work">Work</a>
      <a href="/pricing">Pricing</a>
      <a href="/get-started">Get a Quote</a>
    </nav>

    <div class="nav-actions">
      <button
        type="button"
        class:open={mobileMenuOpen}
        class="mobile-menu-toggle"
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <span></span>
        <span></span>
      </button>

      <a href="/get-started" class="mini-cta" onclick={closeMobileMenu}>
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