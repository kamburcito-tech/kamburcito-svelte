<script>
  import { contactEmailHref, linkedinHref } from '$lib/contact.js';

  /** Copy for one language (src/lib/i18n); the WhatsApp link follows it. */
  /** @type {{ t: typeof import('$lib/i18n/en.js').default }} */
  let { t } = $props();
</script>

<footer class="footer">
  <div class="wide-container footer-inner site-footer__inner">
    <p>{t.footer.studio}</p>
    <p>{t.footer.tagline}</p>
    <p>{t.footer.madeBy}</p>

    <ul class="site-footer__contact" aria-label={t.footer.contactAria}>
      <li>
        <a
          class="site-footer__icon"
          href={contactEmailHref}
          aria-label={t.footer.emailAria}
          title={t.footer.emailAria}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5"></path>
          </svg>
        </a>
      </li>
      <li>
        <a
          class="site-footer__icon site-footer__icon--whatsapp"
          href={t.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.footer.whatsappAria}
          title={t.footer.whatsappAria}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 20.5 5 16.2A8.5 8.5 0 1 1 8 19.1Z"></path>
            <path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5l.9 2-.6.8a5.6 5.6 0 0 0 2.5 2.5l.8-.6 2 .9v.5c0 .3-.1.6-.6.8-.8.4-2 .3-3.6-.7a8.4 8.4 0 0 1-2.4-2.4c-1-1.6-1.1-2.8-.7-3.6Z"></path>
          </svg>
        </a>
      </li>
      <li>
        <a class="site-footer__link" href={linkedinHref} target="_blank" rel="noopener noreferrer">
          {t.footer.linkedin}
        </a>
      </li>
    </ul>
  </div>
</footer>

<style>
  .site-footer__inner {
    align-items: center;
  }

  .site-footer__contact {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Round icon buttons (moved here from the header). */
  .site-footer__icon {
    --contact-color: var(--text);
    --contact-border: color-mix(in srgb, var(--text) 18%, transparent);
    --contact-bg: transparent;
    --contact-bg-hover: color-mix(in srgb, var(--text) 8%, transparent);
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--contact-border);
    border-radius: 50%;
    color: var(--contact-color);
    background: var(--contact-bg);
    transition:
      background-color 180ms ease,
      border-color 180ms ease,
      transform 180ms ease;
  }

  .site-footer__icon--whatsapp {
    --contact-color: #25d366;
    --contact-border: rgba(37, 211, 102, 0.3);
    --contact-bg: rgba(37, 211, 102, 0.07);
    --contact-bg-hover: rgba(37, 211, 102, 0.16);
  }

  /* The home page's light theme forces footer links to the text color;
     the WhatsApp icon keeps its brand green, as it had in the header. */
  :global(:root[data-theme='light']) .footer .site-footer__icon--whatsapp {
    color: var(--contact-color) !important;
  }

  .site-footer__icon svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .site-footer__icon:hover {
    background: var(--contact-bg-hover);
    transform: translateY(-1px);
  }

  .site-footer__link {
    margin-left: 4px;
    color: var(--text);
    font-family: 'Cormorant Garamond Variable', Georgia, serif;
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--accent) 55%, transparent);
    text-underline-offset: 4px;
  }

  .site-footer__link:hover {
    text-decoration-color: currentColor;
  }

  .site-footer__icon:focus-visible,
  .site-footer__link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .site-footer__icon:hover {
      transform: none;
    }
  }

  @media (max-width: 820px) {
    .site-footer__inner {
      align-items: start;
    }

    .site-footer__contact {
      margin-top: 6px;
    }
  }
</style>
