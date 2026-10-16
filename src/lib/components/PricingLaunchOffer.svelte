<script>
  import { onMount } from 'svelte';
  import { asset, resolve } from '$app/paths';
  import { offerExpiresAt, scheduleOfferExpiry } from '$lib/onePageOffer.js';

  let section;
  let isPending = $state(false);
  let isVisible = $state(false);

  onMount(() => {
    if (Date.now() < offerExpiresAt) {
      document.documentElement.dataset.onePageOfferActive = 'true';
    } else {
      delete document.documentElement.dataset.onePageOfferActive;
    }
    const stopExpiry = scheduleOfferExpiry(() => {
      delete document.documentElement.dataset.onePageOfferActive;
    });
    if (!section || !('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) return stopExpiry;

    isPending = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      isVisible = true;
      observer.disconnect();
    }, { threshold: 0.16 });
    observer.observe(section);

    return () => {
      observer.disconnect();
      stopExpiry();
    };
  });
</script>

<svelte:head>
  <!-- Keep this pre-paint cutoff in sync with onePageOffer.js. -->
  <script>
    if (Date.now() < Date.UTC(2026, 11, 16)) {
      document.documentElement.dataset.onePageOfferActive = 'true';
    }
  </script>
</svelte:head>

<section class="launch-offer" class:is-pending={isPending} class:is-visible={isVisible} aria-labelledby="launch-offer-heading" bind:this={section}>
  <div class="wide-container launch-offer__layout">
    <div class="launch-offer__copy">
      <h2 id="launch-offer-heading">Your <span>one-page</span> website.</h2>

      <div class="launch-offer__details">
        <p class="launch-offer__name">ONE-PAGE LAUNCH</p>
        <p class="launch-offer__price"><span>$250</span> <span>USD</span></p>
        <p class="launch-offer__description">A responsive one-page website, designed and built for your business.</p>

        <a class="launch-offer__cta" href={resolve('/get-started?promo=KAMBUR250')}>
          CLAIM THE OFFER
        </a>

        <div class="launch-offer__terms">
          <p>Offer ends December 15, 2026.</p>
          <p>Promo code: <strong>KAMBUR250</strong></p>
        </div>
        <p class="launch-offer__scope">Final scope is confirmed in your proposal.</p>
      </div>
    </div>

    <figure class="launch-offer__visual">
      <img
        src={asset('/images/pricing/alterra_alpine_gear_showcase.webp')}
        alt="Illustrative ALTERRA Alpine Gear website design concept shown on desktop and mobile"
        width="1448"
        height="1086"
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        Illustrative design concept only. E-commerce features are not included in this offer.
      </figcaption>
    </figure>
  </div>
</section>

<style>
  :global(:root[data-one-page-offer-active='true']) .launch-offer {
    display: block;
  }

  .launch-offer {
    display: none;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(64px, 7vw, 96px) 0;
    color: #f7f9ff;
    background:
      radial-gradient(ellipse 58% 72% at 76% 48%, rgba(36, 87, 162, 0.42), rgba(22, 61, 122, 0.2) 48%, transparent 82%),
      linear-gradient(180deg, #09152c 0%, #102a59 48%, #09172f 100%);
  }

  :global(:root[data-theme='light']) .launch-offer {
    background:
      radial-gradient(ellipse 58% 72% at 76% 48%, rgba(54, 117, 208, 0.2), transparent 82%),
      linear-gradient(180deg, #eef3fb 0%, #d4e4fc 50%, #d5e2f5 100%);
  }

  :global(:root[data-theme='light']) .launch-offer h2,
  :global(:root[data-theme='light']) .launch-offer__price,
  :global(:root[data-theme='light']) .launch-offer__terms strong {
    color: #122c60;
  }

  :global(:root[data-theme='light']) .launch-offer__name {
    color: #2452a4;
  }

  :global(:root[data-theme='light']) .launch-offer__description {
    color: #233d71;
  }

  :global(:root[data-theme='light']) .launch-offer__terms,
  :global(:root[data-theme='light']) .launch-offer__scope,
  :global(:root[data-theme='light']) .launch-offer__visual figcaption {
    color: #294775;
  }

  :global(:root[data-theme='light']) .launch-offer__details {
    border-top-color: rgba(35, 82, 164, 0.23);
  }

  :global(:root[data-theme='light']) .launch-offer__cta:focus-visible {
    outline-color: #122c60;
  }


  .launch-offer__layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: center;
    gap: clamp(40px, 5vw, 88px);
  }

  .launch-offer__copy,
  .launch-offer__visual {
    min-width: 0;
  }

  .launch-offer__name,
  .launch-offer__terms,
  .launch-offer__scope,
  .launch-offer__visual figcaption {
    font-family: 'Manrope Variable', Arial, sans-serif;
  }


  .launch-offer h2 {
    max-width: none;
    margin: 0;
    color: #f7f9ff;
    font-family: 'Cormorant Garamond Variable', Georgia, serif;
    font-size: clamp(3rem, 4vw, 4.2rem);
    font-weight: 600;
    line-height: 0.97;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .launch-offer h2 span {
    white-space: nowrap;
  }

  .launch-offer__details {
    margin-top: clamp(16px, 2vw, 26px);
    padding-top: 20px;
    border-top: 1px solid rgba(157, 196, 255, 0.3);
  }

  .launch-offer__name {
    margin: 0;
    color: #b6d0fb;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .launch-offer__price {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin: 10px 0 0;
    color: #fff;
    font-family: 'Cormorant Garamond Variable', Georgia, serif;
    font-variant-numeric: lining-nums tabular-nums;
  }

  .launch-offer__price span:first-child {
    font-size: clamp(5.25rem, 7vw, 7rem);
    font-weight: 600;
    line-height: 0.9;
    letter-spacing: -0.04em;
  }

  .launch-offer__price span:last-child {
    font-family: 'Manrope Variable', Arial, sans-serif;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.13em;
  }

  .launch-offer__description {
    max-width: 56ch;
    margin: 16px 0 0;
    color: #d8e5fa;
    font-family: 'Manrope Variable', Arial, sans-serif;
    font-size: 1.04rem;
    line-height: 1.65;
  }


  .launch-offer__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    min-height: 60px;
    margin-top: 24px;
    padding: 0 30px;
    border: 1px solid rgba(191, 215, 255, 0.48);
    border-radius: 999px;
    color: #fff;
    background: #2254ba;
    box-shadow: 0 14px 34px rgba(3, 13, 39, 0.25);
    font-family: 'Manrope Variable', Arial, sans-serif;
    font-size: 0.79rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-decoration: none;
    transition: background 250ms ease, transform 250ms ease, box-shadow 250ms ease;
  }


  .launch-offer__cta:hover {
    background: #316bda;
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(3, 13, 39, 0.32);
  }

  .launch-offer__cta:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 5px;
  }

  .launch-offer__terms {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 28px;
    margin-top: 18px;
    color: #c6d9f7;
    font-size: 0.86rem;
    line-height: 1.5;
  }

  .launch-offer__terms p {
    margin: 0;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .launch-offer__terms strong {
    color: #fff;
    font-weight: 800;
    letter-spacing: 0.05em;
    user-select: all;
  }

  .launch-offer__scope {
    max-width: 55ch;
    margin: 10px 0 0;
    color: #afc4e4;
    font-size: 0.84rem;
    line-height: 1.6;
  }

  .launch-offer__visual {
    position: relative;
    isolation: isolate;
    margin: 0;
  }

  .launch-offer__visual::before {
    position: absolute;
    z-index: -1;
    inset: -12%;
    background: radial-gradient(ellipse at center, rgba(45, 111, 203, 0.3), rgba(28, 80, 155, 0.12) 48%, transparent 76%);
    content: '';
    pointer-events: none;
  }

  :global(:root[data-theme='light']) .launch-offer__visual::before {
    background: radial-gradient(ellipse at center, rgba(36, 97, 185, 0.2), transparent 76%);
  }

  .launch-offer__visual img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .launch-offer__visual figcaption {
    max-width: 44ch;
    margin: 14px auto 0;
    color: #b9cdee;
    font-size: 0.82rem;
    line-height: 1.55;
    text-align: center;
  }

  .launch-offer.is-pending .launch-offer__copy,
  .launch-offer.is-pending .launch-offer__visual {
    transition: opacity 750ms ease-out, transform 750ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .launch-offer.is-pending:not(.is-visible) .launch-offer__copy,
  .launch-offer.is-pending:not(.is-visible) .launch-offer__visual {
    opacity: 0.72;
    transform: translateY(18px);
  }

  .launch-offer.is-pending .launch-offer__visual {
    transition-delay: 90ms;
  }

  @media (hover: hover) {
    .launch-offer.is-visible .launch-offer__visual:hover img {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 900px) {
    .launch-offer {
      padding: 64px 0 72px;
    }

    .launch-offer__layout {
      grid-template-columns: 1fr;
      gap: 36px;
    }

    .launch-offer h2 {
      font-size: clamp(3rem, 7vw, 4.1rem);
    }

    .launch-offer__details {
      margin-top: 24px;
    }

    .launch-offer__visual {
      width: min(100%, 700px);
      margin-inline: auto;
    }
  }

  @media (max-width: 520px) {
    .launch-offer {
      padding: 44px 0 52px;
    }

    .launch-offer__layout {
      gap: 28px;
    }

    .launch-offer h2 {
      font-size: clamp(2.8rem, 10vw, 3.5rem);
    }

    .launch-offer__details {
      margin-top: 20px;
      padding-top: 20px;
    }

    .launch-offer__price span:first-child {
      font-size: clamp(5.5rem, 22vw, 7.5rem);
    }

    .launch-offer__description {
      margin-top: 16px;
      font-size: 0.98rem;
    }

    .launch-offer__cta {
      margin-top: 24px;
      width: 100%;
      max-width: 360px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .launch-offer.is-pending .launch-offer__copy,
    .launch-offer.is-pending .launch-offer__visual {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .launch-offer__cta,
    .launch-offer__visual img {
      transition: none;
    }

    .launch-offer__cta:hover,
    .launch-offer.is-visible .launch-offer__visual:hover img {
      transform: none;
    }
  }
</style>
