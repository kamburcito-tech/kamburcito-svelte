<script>
  import { afterNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { contactEmailHref, whatsappHref } from '$lib/contact.js';
  import en from '$lib/i18n/en.js';

  import '@fontsource-variable/cormorant-garamond';
  import '@fontsource-variable/manrope';

  import '../styles/00-global.css';
  import '../styles/01-header-footer.css';
  import '../styles/02-components.css';
  import '../styles/80-animations.css';

  let { children } = $props();

  const t = en;

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
        href={resolve(t.routes.home)}
        class="brand"
        aria-label={t.header.homeAria}
        onclick={closeMobileMenu}
      >
        <span class="brand-name">kamburcito</span><span class="brand-studio">studio</span>
      </a>

      <nav class="desktop-nav" aria-label={t.header.mainNavAria}>
        <a href={resolve(t.routes.work)}>{t.header.work}</a>
        <a href="{resolve(t.routes.home)}#about">{t.header.about}</a>
        <a href="{resolve(t.routes.home)}#contact">{t.header.contact}</a>
      </nav>

      <div class="nav-actions">
        <div class="nav-contact-group">
          <a class="nav-contact" href={contactEmailHref} aria-label={t.header.emailAria} title={t.header.emailAria}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <path d="m3.5 6.5 8.5 6.5 8.5-6.5"></path>
            </svg>
          </a>
          <a
            class="nav-contact nav-contact--whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.whatsappAria}
            title={t.header.whatsappAria}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 20.5 5 16.2A8.5 8.5 0 1 1 8 19.1Z"></path>
              <path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5l.9 2-.6.8a5.6 5.6 0 0 0 2.5 2.5l.8-.6 2 .9v.5c0 .3-.1.6-.6.8-.8.4-2 .3-3.6-.7a8.4 8.4 0 0 1-2.4-2.4c-1-1.6-1.1-2.8-.7-3.6Z"></path>
            </svg>
          </a>
        </div>

        <button
          type="button"
          class="theme-toggle"
          aria-label={t.header.themeAria}
          title={t.header.themeAria}
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
          href="{resolve(t.routes.home)}#contact"
          class="mini-cta btn-primary"
          onclick={closeMobileMenu}
        >
          {t.header.cta}
        </a>
        <button
          type="button"
          class:open={mobileMenuOpen}
          class="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? t.header.closeMenu : t.header.openMenu}
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

  <nav id="mobile-navigation" class="mobile-menu" aria-label={t.header.mobileNavAria} hidden={!mobileMenuOpen}>
    <a href={resolve(t.routes.home)} onclick={closeMobileMenu}>{t.header.mobileHome}</a>
    <a href={resolve(t.routes.work)} onclick={closeMobileMenu}>{t.header.work}</a>
    <a href="{resolve(t.routes.home)}#about" onclick={closeMobileMenu}>{t.header.about}</a>
    <a href="{resolve(t.routes.home)}#contact" onclick={closeMobileMenu}>{t.header.contact}</a>
    <a
      class="mobile-menu-contact"
      href={contactEmailHref}
      aria-label={t.header.emailAria}
      title={t.header.emailAria}
      onclick={closeMobileMenu}
    >{t.header.mobileEmail}</a>
    <a
      class="mobile-menu-contact"
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.header.whatsappAria}
      title={t.header.whatsappAria}
      onclick={closeMobileMenu}
    >{t.header.mobileWhatsapp}</a>
  </nav>
</header>

{@render children()}