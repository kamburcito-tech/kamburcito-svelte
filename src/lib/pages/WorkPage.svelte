<script>
  import '../../styles/20-work.css';
  import CellsBackground from '$lib/components/CellsBackground.svelte';

  /** Page copy for one language (src/lib/i18n). */
  /** @type {{ t: typeof import('$lib/i18n/en.js').default }} */
  let { t } = $props();

  // Structure only; titles stay as client names unless the dictionary sets one.
  const featuredData = [
    {
      id: 'femsculpt',
      title: 'FemSculpt',
      platform: 'WordPress',
      image: '/images/work/femsculpt-work-project.webp',
      link: 'https://femsculpt.com/',
      cta: 'live'
    },
    {
      id: 'immigration-law-dfw',
      title: 'Immigration Law DFW',
      platform: 'WordPress',
      image: '/images/work/din-law-firm-work-project.webp',
      link: 'https://immigrationlawdfw.com/',
      cta: 'visit'
    },
    {
      id: 'beccar-varela',
      title: 'Beccar Varela',
      platform: 'WordPress',
      image: '/images/work/law-firm-work-project.webp',
      link: 'https://beccarvarela.com/en/',
      cta: 'visit'
    },
    {
      id: 'nc-builders',
      title: 'NC Builders',
      platform: 'WordPress / Elementor',
      image: '/images/work/nc-builders-work-project.webp',
      link: 'https://ncbuilders.biz/',
      cta: 'visit'
    },
    {
      id: 'shady-grove',
      title: 'Shady Grove Fertility',
      platform: 'WordPress',
      image: '/images/work/shady-grove-fertility-work-project.webp',
      link: 'https://shadygrovefertility.com/',
      cta: 'live'
    }
  ];

  const moreData = [
    {
      id: 'spry-society',
      title: 'Spry Society',
      platform: 'WordPress',
      image: '/images/work/spry-society-work-project.webp',
      link: 'https://thesprysociety.com/',
      cta: 'visit'
    },
    {
      id: 'conduct-science',
      title: 'Conduct Science',
      platform: 'WordPress / WooCommerce',
      image: '/images/work/conductscience-work-project.webp',
      link: 'https://conductscience.com/',
      cta: 'live'
    },
    {
      id: 'surfaceworks',
      title: 'SurfaceWorks',
      platform: 'WordPress / Elementor',
      image: '/images/work/surfaceworks-work-project.webp',
      link: 'https://surfaceworks.com.au/',
      cta: 'live'
    },
    {
      id: 'takahiro-ogawa',
      title: 'Takahiro Ogawa',
      platform: 'Squarespace',
      image: '/images/work/takahiro-artist-work-project.webp',
      link: 'https://takahiroogawa.com/',
      cta: 'live'
    },
    {
      id: 'lark',
      title: 'Lark',
      platform: 'Webflow',
      image: '/images/work/lark-work-project.webp',
      link: 'https://www.lark.com/',
      cta: 'live'
    }
  ];

  /** @param {typeof featuredData} list */
  const withCopy = (list) =>
    list.map((project) => ({ ...project, ...t.work.projects[project.id] }));

  const featuredProjects = $derived(withCopy(featuredData));
  const moreProjects = $derived(withCopy(moreData));
</script>

<svelte:head>
  <title>{t.work.meta.title}</title>

  <meta
    name="description"
    content={t.work.meta.description}
  />

  <link rel="canonical" href={t.work.meta.url} />

  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content={t.work.meta.title}
  />
  <meta
    property="og:description"
    content={t.work.meta.description}
  />
  <meta property="og:url" content={t.work.meta.url} />
  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />

  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="work-page-hero">
  <CellsBackground />
  <div class="wide-container work-hero-inner">
    <h1>{t.work.hero.title}</h1>

    <p>
      {t.work.hero.subtitle}
    </p>

    <p class="work-hero-note">{t.work.hero.note}</p>

    <div class="work-hero-actions">
      <a href="#featured-work" class="work-hero-button">
        {t.work.hero.explore} <span aria-hidden="true">↓</span>
      </a>
      <a
        href="/Patricia-Diaz-CV.pdf"
        class="work-hero-button work-hero-button--ghost"
        target="_blank"
        rel="noopener"
      >
        {t.work.hero.cv}
      </a>
    </div>
  </div>
</section>

{#snippet projectCard(project)}
  <article class="work-featured-card">
    <div class="work-featured-image">
      <img src={project.image} alt={project.title} />
    </div>

    <div class="work-featured-content">
      <p class="eyebrow">{t.work.card.eyebrow}</p>

      <h2>{project.title}</h2>

      <p>{project.description}</p>

      <div class="work-meta-grid">
        <div>
          <span>{t.work.card.role}</span>
          <strong>{project.role}</strong>
        </div>

        <div>
          <span>{t.work.card.platform}</span>
          <strong>{project.platform}</strong>
        </div>
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.work.card[project.cta]}
      </a>
    </div>
  </article>
{/snippet}

<section id="featured-work" class="work-featured-list">
  <div class="wide-container">
    {#each featuredProjects as project (project.link)}
      {@render projectCard(project)}
    {/each}
  </div>

  <!-- The heading is the first child, so the image side keeps alternating
       from the last featured card. -->
  <div class="wide-container work-more">
    <h2 class="work-more__title">{t.work.moreTitle}</h2>
    {#each moreProjects as project (project.link)}
      {@render projectCard(project)}
    {/each}
  </div>
</section>

<section id="contact" class="work-closing" aria-labelledby="work-closing-title">
  <img
    class="work-closing__image"
    src="/images/hero/kamkam.webp"
    alt=""
    width="1122"
    height="1402"
    loading="lazy"
    decoding="async"
  />
  <div class="work-closing__content">
    <p class="work-closing__eyebrow">{t.work.closing.eyebrow}</p>
    <h2 id="work-closing-title">{t.work.closing.title}</h2>
    <p class="work-closing__description">
      {t.work.closing.description}
    </p>
    <a class="btn btn-primary work-closing__button" href="/get-started">{t.work.closing.button}</a>
  </div>
</section>

<footer class="footer">
  <div class="wide-container footer-inner">
    <p>{t.footer.studio}</p>
    <p>{t.footer.tagline}</p>
    <p>{t.footer.madeBy}</p>
  </div>
</footer>