<script>
  /** Carousel copy for one language: `t.carousel` from src/lib/i18n. */
  /** @type {{ t: typeof import('$lib/i18n/en.js').default.carousel }} */
  let { t } = $props();

  /**
   * Display-only cards: no links, buttons or click handlers. Images are
   * decorative (empty alt); the label chip names each card.
   * @typedef {object} HeroCard
   * @property {string} id     Key into the dictionary's `cards` (label text lives there).
   * @property {'site' | 'stat'} kind
   * @property {string} [title] Client name, or a title or stat value from the dictionary.
   * @property {string} [label] Category, or the stat caption (from the dictionary).
   * @property {string} [src]   Site cards only.
   * @property {number} [width] Intrinsic width of `src`.
   * @property {number} [height] Intrinsic height of `src`.
   */

  /**
   * Cards alternate between the two columns in array order:
   * even indexes go to column 1, odd indexes to column 2.
   * Strongest projects first, then stats, cards without a landing image,
   * and "Past project" cards last. Keep the count even and one stat card
   * per column so both loops match.
   * @type {HeroCard[]}
   */
  const cards = [
    {
      kind: 'site',
      id: 'femsculpt',
      title: 'FemSculpt',
      src: '/images/hero/cards/femsculpt-landing.webp',
      width: 960,
      height: 2525
    },
    {
      kind: 'site',
      id: 'immigration-law-dfw',
      title: 'Immigration Law DFW',
      src: '/images/hero/cards/immigration-law-dfw-landing.webp',
      width: 960,
      height: 1611
    },
    {
      kind: 'site',
      id: 'beccar-varela',
      title: 'Beccar Varela',
      src: '/images/hero/cards/beccar-landing.webp',
      width: 960,
      height: 1552
    },
    {
      kind: 'site',
      id: 'shady-grove',
      title: 'Shady Grove Fertility',
      src: '/images/hero/cards/shady-grove-landing.webp',
      width: 960,
      height: 1272
    },
    {
      kind: 'site',
      id: 'nc-builders',
      title: 'NC Builders',
      src: '/images/hero/cards/nc-builders-landing.webp',
      width: 960,
      height: 1406
    },
    { id: 'websites', kind: 'stat' },
    { id: 'since', kind: 'stat' },
    {
      kind: 'site',
      id: 'lark',
      title: 'Lark',
      src: '/images/hero/cards/lark-landing.webp',
      width: 960,
      height: 1593
    },
    {
      kind: 'site',
      id: 'spry-society',
      title: 'Spry Society',
      src: '/images/hero/cards/spry-society-landing.webp',
      width: 960,
      height: 1881
    },
    {
      kind: 'site',
      id: 'surfaceworks',
      title: 'SurfaceWorks',
      src: '/images/hero/cards/surfaceworks-card.webp',
      width: 960,
      height: 600
    },
    {
      kind: 'site',
      id: 'plastic-surgery',
      src: '/images/hero/cards/chicago-plastic-surgery-landing.webp',
      width: 960,
      height: 1583
    },
    {
      kind: 'site',
      id: 'med-spa',
      src: '/images/hero/cards/medspa-landing.webp',
      width: 960,
      height: 1946
    }
  ];

  /** Loop speed: seconds of animation per card, so both columns move at the same pace. */
  const SECONDS_PER_CARD = 11.5;
  /** Cards per column that can be on screen at load (up to 4 at 1920px); these load eagerly. */
  const EAGER_PER_COLUMN = 4;

  const withCopy = $derived(cards.map((card) => ({ ...card, ...t.cards[card.id] })));

  const columns = $derived([
    withCopy.filter((_, index) => index % 2 === 0),
    withCopy.filter((_, index) => index % 2 === 1)
  ]);
</script>

{#snippet card(/** @type {HeroCard} */ item, /** @type {number} */ index, /** @type {boolean} */ duplicate)}
  <div class="hc__card hc__card--{item.kind}">
    {#if item.kind === 'site'}
      <img
        src={item.src}
        width={item.width}
        height={item.height}
        alt=""
        loading={!duplicate && index < EAGER_PER_COLUMN ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span class="hc__chip">
        <span class="hc__chip-title">{item.title}</span>
        {#if item.label}<span class="hc__chip-label">{item.label}</span>{/if}
      </span>
    {:else}
      <span class="hc__stat-value">{item.title}</span>
      <span class="hc__stat-rule" aria-hidden="true"></span>
      <span class="hc__stat-label">{item.label}</span>
    {/if}
  </div>
{/snippet}

<section class="hc" aria-label={t.aria}>
  <div class="hc__viewport">
    {#each columns as column, columnIndex (columnIndex)}
      <div
        class="hc__track"
        class:hc__track--down={columnIndex === 1}
        style:--hc-duration="{column.length * SECONDS_PER_CARD}s"
      >
        <ul class="hc__set">
          {#each column as item, index (item.id)}
            <li>{@render card(item, index, false)}</li>
          {/each}
        </ul>
        <ul class="hc__set hc__set--clone" aria-hidden="true">
          {#each column as item, index (item.id)}
            <li>{@render card(item, index, true)}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style>
  /* A square, full-bleed panel that fills its parent; the parent sets the size
     (e.g. the hero's right column). */
  .hc {
    /* Tweak card geometry here. */
    --hc-card-w: 260px;
    --hc-card-h: 300px;
    --hc-gap: 24px;
    /* Minimum side space. */
    --hc-pad-x: 12px;

    --hc-teal: #0e7c86;
    --hc-navy: #0b2540;
    --hc-border: #d9e4ec;

    /* Size containment: the tall tracks never inflate the parent's height. */
    container-type: size;
    width: 100%;
    height: 100%;
    min-width: 0;
    overflow: hidden;
    background: #e6f4f5;
  }

  :global(:root[data-theme='dark']) .hc {
    background: #0b3a40;
  }

  /* Both columns centered; cards are cut cleanly at the top and bottom edges. */
  .hc__viewport {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: var(--hc-gap);
    height: 100%;
    padding-inline: var(--hc-pad-x);
    overflow: hidden;
  }

  /* Cards shrink proportionally once the panel is narrower than two full
     cards plus the minimum side space (2 × 260 + 24 + 2 × 12 = 568px). */
  @container (max-width: 567px) {
    .hc__viewport {
      --hc-card-w: calc((100cqi - 2 * var(--hc-pad-x) - var(--hc-gap)) / 2);
      --hc-card-h: calc(var(--hc-card-w) * 300 / 260);
    }
  }

  @container (max-width: 420px) {
    .hc__viewport {
      --hc-gap: 16px;
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

  .hc:hover .hc__track {
    animation-play-state: paused;
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
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 12px 32px rgba(11, 37, 64, 0.1);
    color: inherit;
    cursor: default;
  }

  .hc__card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
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
    border-radius: 4px;
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
      border-radius: 4px;
    }

    .hc__chip-title {
      font-size: 0.7rem;
    }

    .hc__chip-label {
      font-size: 0.56rem;
      letter-spacing: 0.1em;
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
