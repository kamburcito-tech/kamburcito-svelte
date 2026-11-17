<script>
  /**
   * @typedef {object} HeroCard
   * @property {'site' | 'stat'} kind
   * @property {string} title  Site name, or the stat value ("50+").
   * @property {string} [label] Site category, or the stat caption.
   * @property {string} [src]   Site cards only.
   * @property {number} [width] Intrinsic width of `src`.
   * @property {number} [height] Intrinsic height of `src`.
   * @property {string} [alt]
   * @property {string} href
   */

  /**
   * Cards alternate between the two columns in array order:
   * even indexes go to column 1, odd indexes to column 2.
   * @type {HeroCard[]}
   */
  const cards = [
    {
      kind: 'site',
      title: 'FemSculpt',
      label: 'Cosmetic gynecology',
      src: '/images/hero/cards/femsculpt-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the FemSculpt cosmetic gynecology website',
      href: '/work'
    },
    {
      kind: 'site',
      title: 'Immigration Law DFW',
      label: 'Law firm',
      src: '/images/hero/cards/din-law-firm-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the Immigration Law DFW law firm website',
      href: '/work'
    },
    {
      kind: 'site',
      title: 'Beccar Varela',
      label: 'Law firm',
      src: '/images/hero/cards/law-firm-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the Beccar Varela law firm website',
      href: '/work'
    },
    { kind: 'stat', title: '50+', label: 'websites delivered', href: '/work' },
    {
      kind: 'site',
      title: 'Shady Grove Fertility',
      label: 'Healthcare',
      src: '/images/hero/cards/shady-grove-fertility-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the Shady Grove Fertility healthcare website',
      href: '/work'
    },
    {
      kind: 'site',
      title: 'Spry Society',
      label: 'Wellness',
      src: '/images/hero/cards/spry-society-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the Spry Society wellness website',
      href: '/work'
    },
    { kind: 'stat', title: 'Since 2019', label: 'founder-led studio', href: '/work' },
    {
      kind: 'site',
      title: 'Lark',
      src: '/images/hero/cards/lark-card.webp',
      width: 640,
      height: 376,
      alt: 'Homepage of the Lark website',
      href: '/work'
    },
    {
      kind: 'site',
      title: 'SurfaceWorks',
      label: 'Industrial services',
      src: '/images/hero/cards/surfaceworks-card.webp',
      width: 640,
      height: 400,
      alt: 'Homepage of the SurfaceWorks industrial services website',
      href: '/work'
    }
  ];

  /** Loop speed: seconds of animation per card, so both columns move at the same pace. */
  const SECONDS_PER_CARD = 11.5;
  /** Cards per column that can be on screen at load; these images load eagerly. */
  const EAGER_PER_COLUMN = 3;

  const columns = [
    cards.filter((_, index) => index % 2 === 0),
    cards.filter((_, index) => index % 2 === 1)
  ];

  /** @param {HeroCard} card */
  function describe(card) {
    if (card.kind === 'stat') return `${card.title} ${card.label}. View the work page`;
    return `${card.title}${card.label ? `, ${card.label}` : ''} website. View the work page`;
  }

  /**
   * Keyboard focus may scroll the viewport to reveal a card;
   * restore the loop's origin once focus leaves the carousel.
   * @param {FocusEvent & { currentTarget: HTMLDivElement }} event
   */
  function handleFocusOut(event) {
    const viewport = event.currentTarget;
    const next = /** @type {Node | null} */ (event.relatedTarget);
    if (next && viewport.contains(next)) return;
    viewport.scrollTop = 0;
  }
</script>

{#snippet card(/** @type {HeroCard} */ item, /** @type {number} */ index, /** @type {boolean} */ duplicate)}
  <a
    class="hc__card hc__card--{item.kind}"
    href={item.href}
    aria-label={duplicate ? undefined : describe(item)}
    tabindex={duplicate ? -1 : undefined}
  >
    {#if item.kind === 'site'}
      <img
        src={item.src}
        width={item.width}
        height={item.height}
        alt={duplicate ? '' : item.alt}
        loading={index < EAGER_PER_COLUMN ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span class="hc__chip">
        <span class="hc__chip-title">{item.title}</span>
        {#if item.label}<span class="hc__chip-label">{item.label}</span>{/if}
      </span>
    {:else}
      <span class="hc__stat-value">{item.title}</span>
      <span class="hc__stat-rule"></span>
      <span class="hc__stat-label">{item.label}</span>
    {/if}
  </a>
{/snippet}

<section class="hc" aria-label="Selected client websites and studio highlights">
  <div class="hc__viewport" onfocusout={handleFocusOut}>
    {#each columns as column, columnIndex (columnIndex)}
      <div
        class="hc__track"
        class:hc__track--down={columnIndex === 1}
        style:--hc-duration="{column.length * SECONDS_PER_CARD}s"
      >
        <ul class="hc__set">
          {#each column as item, index (item.title)}
            <li>{@render card(item, index, false)}</li>
          {/each}
        </ul>
        <ul class="hc__set hc__set--clone" aria-hidden="true">
          {#each column as item, index (item.title)}
            <li>{@render card(item, index, true)}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style>
  /* Fills its parent: the parent sets the height (e.g. the hero's right column). */
  .hc {
    /* Tweak card geometry here. */
    --hc-card-w: 260px;
    --hc-card-h: 300px;
    --hc-gap: 24px;
    /* Panel side padding; also keeps card shadows and focus rings unclipped. */
    --hc-pad-x: 24px;

    --hc-teal: #0e7c86;
    --hc-navy: #0b2540;
    --hc-border: #d9e4ec;

    /* Size containment: the tall tracks never inflate the parent's height. */
    container-type: size;
    width: 100%;
    height: 100%;
    min-width: 0;
  }

  /* The panel: cards are cut cleanly at its top and bottom edges. */
  .hc__viewport {
    display: flex;
    align-items: flex-start;
    gap: var(--hc-gap);
    width: fit-content;
    max-width: 100%;
    height: 100%;
    margin-inline: auto;
    padding-inline: var(--hc-pad-x);
    overflow: hidden;
    scroll-padding-block: var(--hc-gap);
    border: 1px solid var(--hc-border);
    border-radius: 32px;
    background: linear-gradient(180deg, #e6f4f5 0%, #dceef0 100%);
  }

  :global(:root[data-theme='dark']) .hc__viewport {
    border-color: rgba(255, 255, 255, 0.08);
    background: #0b3a40;
  }

  /* Cards shrink proportionally once the container is narrower than two full
     cards plus panel padding and border (2 × 260 + 24 + 2 × 24 + 2 = 594px). */
  @container (max-width: 593px) {
    .hc__viewport {
      --hc-card-w: calc((100cqi - 2 * var(--hc-pad-x) - 2px - var(--hc-gap)) / 2);
      --hc-card-h: calc(var(--hc-card-w) * 300 / 260);
    }
  }

  @container (max-width: 420px) {
    .hc__viewport {
      --hc-gap: 16px;
      --hc-pad-x: 12px;
    }
  }

  .hc__track {
    flex: 0 0 var(--hc-card-w);
    width: var(--hc-card-w);
    height: max-content;
    animation: hc-loop var(--hc-duration, 52s) linear infinite;
    will-change: transform;
  }

  /* Column 2 sits half a card out of phase and travels downward. */
  .hc__track--down {
    margin-top: calc((var(--hc-card-h) + var(--hc-gap)) / -2);
    animation-direction: reverse;
  }

  .hc:hover .hc__track,
  .hc:focus-within .hc__track {
    animation-play-state: paused;
  }

  /* Keyboard users get a still layout so the browser can scroll the
     focused card into view inside the viewport. */
  .hc:has(.hc__card:focus-visible) .hc__track {
    padding-top: 6px;
    animation: none;
  }

  .hc:has(.hc__card:focus-visible) .hc__track--down {
    margin-top: calc((var(--hc-card-h) + var(--hc-gap)) / 2);
  }

  @keyframes hc-loop {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

  .hc__set {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Margin (not flex gap) keeps both halves exactly equal, so -50% loops seamlessly. */
  .hc__set li {
    margin-bottom: var(--hc-gap);
  }

  .hc__card {
    position: relative;
    display: block;
    width: var(--hc-card-w);
    height: var(--hc-card-h);
    overflow: hidden;
    border: 1px solid var(--hc-border);
    border-radius: 24px;
    background: #fff;
    box-shadow: 0 12px 32px rgba(11, 37, 64, 0.1);
    color: inherit;
    text-decoration: none;
  }

  .hc__card:focus-visible {
    outline: 3px solid var(--hc-teal);
    outline-offset: 3px;
  }

  .hc__card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .hc__chip {
    position: absolute;
    left: 12px;
    bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: calc(100% - 24px);
    padding: 8px 12px;
    border: 1px solid var(--hc-border);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 4px 12px rgba(11, 37, 64, 0.08);
    font-family: 'Manrope Variable', Arial, sans-serif;
    line-height: 1.25;
  }

  .hc__chip-title {
    color: var(--hc-navy);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .hc__chip-label {
    color: var(--hc-teal);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hc__card--stat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 28px 26px;
    border-color: transparent;
    background: linear-gradient(155deg, #0b3a40 0%, #0e7c86 100%);
    color: #fff;
  }

  .hc__stat-value {
    font-family: 'Cormorant Garamond Variable', Georgia, serif;
    font-size: calc(var(--hc-card-w) * 0.22);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  .hc__stat-rule {
    width: 40px;
    height: 1px;
    margin: 18px 0 14px;
    background: #c9a96e;
  }

  .hc__stat-label {
    font-family: 'Manrope Variable', Arial, sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.86);
  }

  @container (max-width: 420px) {
    .hc__chip {
      left: 8px;
      bottom: 8px;
      max-width: calc(100% - 16px);
      padding: 6px 9px;
      border-radius: 10px;
    }

    .hc__chip-title {
      font-size: 0.7rem;
    }

    .hc__chip-label {
      font-size: 0.56rem;
      letter-spacing: 0.1em;
    }
  }

  @media (max-width: 720px) {
    .hc__viewport {
      justify-content: center;
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hc__track {
      animation: none;
      will-change: auto;
    }

    .hc__track--down {
      margin-top: calc((var(--hc-card-h) + var(--hc-gap)) / 2);
    }

    .hc__set--clone {
      display: none;
    }
  }
</style>
