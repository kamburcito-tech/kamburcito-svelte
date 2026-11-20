<script>
  // Text-only EN | ES switch: the current language is plain bold text, the
  // other links to the equivalent page. No flags, no browser-language redirect.
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { langFromPath, switchPath } from '$lib/i18n';

  /** @type {{ variant?: 'header' | 'menu', onnavigate?: () => void }} */
  let { variant = 'header', onnavigate } = $props();

  const options = /** @type {const} */ ([
    { lang: 'en', label: 'EN', hreflang: 'en', aria: 'Switch to English' },
    { lang: 'es', label: 'ES', hreflang: 'es-AR', aria: 'Cambiar a español' }
  ]);

  const current = $derived(langFromPath(page.url.pathname));
</script>

<div class="lang-switch lang-switch--{variant}">
  {#each options as option, index (option.lang)}
    {#if index > 0}<span class="lang-switch__divider" aria-hidden="true">|</span>{/if}
    {#if option.lang === current}
      <span class="lang-switch__current" lang={option.lang} aria-current="true">{option.label}</span>
    {:else}
      <a
        class="lang-switch__link"
        href={resolve(switchPath(page.url.pathname, option.lang))}
        lang={option.lang}
        hreflang={option.hreflang}
        aria-label={option.aria}
        onclick={onnavigate}
      >
        {option.label}
      </a>
    {/if}
  {/each}
</div>

<style>
  .lang-switch {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: var(--muted);
    font-family: 'Manrope Variable', Arial, sans-serif;
    font-size: 0.72rem;
    line-height: 1;
    letter-spacing: 0.12em;
  }

  .lang-switch__current,
  .lang-switch__link {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 6px;
  }

  .lang-switch__current {
    color: var(--text);
    font-weight: 800;
  }

  /* Overrides the mobile menu's generic link styling (full-width rows with an arrow). */
  .lang-switch__link {
    justify-content: center;
    border-radius: 4px;
    color: var(--muted);
    font-size: inherit;
    font-weight: 500;
    letter-spacing: inherit;
    text-decoration: none;
    transition: color 180ms ease;
  }

  .lang-switch__link::after {
    content: none;
  }

  .lang-switch__link:hover {
    color: var(--text);
    background: none;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .lang-switch__link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .lang-switch__divider {
    opacity: 0.5;
  }

  /* Phones get the switch inside the mobile menu instead. */
  @media (max-width: 820px) {
    .lang-switch--header {
      display: none;
    }
  }

  .lang-switch--menu {
    min-height: 52px;
    padding: 0 10px;
  }
</style>
