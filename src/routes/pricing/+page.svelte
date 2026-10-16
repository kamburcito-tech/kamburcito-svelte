<script>
  import { onMount } from 'svelte';
  import PricingLaunchOffer from '../../lib/components/PricingLaunchOffer.svelte';
  import '../../styles/30-pricing.css';

  let philosophySection;

  onMount(() => {
    if (!philosophySection || !('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = philosophySection;

    section.classList.add('is-pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Custom Website Proposals | Kamburcito Studio</title>

  <meta
    name="description"
    content="Explore a custom web design and development proposal built around your goals, priorities, and project scope."
  />

  <link rel="canonical" href="https://kamburcito.com/pricing/" />

  <meta property="og:type" content="website" />

  <meta
    property="og:title"
    content="Custom Website Proposals | Kamburcito Studio"
  />

  <meta
    property="og:description"
    content="Custom website proposals tailored to your business goals, priorities, and scope."
  />

  <meta
    property="og:url"
    content="https://kamburcito.com/pricing/"
  />

  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />

  <meta
    name="twitter:card"
    content="summary_large_image"
  />
  <meta
  name="twitter:title"
  content="Custom Website Proposals | Kamburcito Studio"
/>

<meta
  name="twitter:description"
  content="Custom website proposals tailored to your business goals, priorities, and scope."
/>

<meta
  name="twitter:image"
  content="https://kamburcito.com/images/kamburcito-social-preview.webp"
/>
</svelte:head>


<section class="pricing-hero">
  <div class="wide-container pricing-hero-inner">

    <h1>Custom websites. Clear proposals.</h1>

    <p>Every project is different. Tell me what you need, and I'll put together a proposal that fits.</p>

    <a
      href="/get-started"
      class="pricing-button"
    >
      REQUEST A QUOTE
    </a>
  </div>
</section>


<section class="pricing-philosophy" aria-labelledby="pricing-approach-title" bind:this={philosophySection}>
  <div class="wide-container">
    <div class="pricing-philosophy-heading">
      <h2 id="pricing-approach-title">Built around your project.</h2>
      <p>Clear scope, thoughtful design, and no unnecessary extras.</p>
    </div>

    <div class="pricing-principles">
      <article class="pricing-principle">
        <span class="pricing-principle__number" aria-hidden="true">01</span>
        <h3>Tailored to you.</h3>
        <p>A website based on your goals and requirements.</p>
      </article>
      <article class="pricing-principle">
        <span class="pricing-principle__number" aria-hidden="true">02</span>
        <h3>Clear expectations.</h3>
        <p>Know what's included before we begin.</p>
      </article>
      <article class="pricing-principle">
        <span class="pricing-principle__number" aria-hidden="true">03</span>
        <h3>What matters most.</h3>
        <p>Focus on the features your business actually needs.</p>
      </article>
    </div>
  </div>
</section>


<PricingLaunchOffer />

<section id="proposal" class="pricing-final" aria-labelledby="pricing-final-title">
  <div class="wide-container pricing-final-inner">
    <h2 id="pricing-final-title">Have a project in mind?</h2>
    <p class="pricing-final-description">Tell me what you're planning. I'll help you figure out the next step.</p>

    <a href="/get-started" class="pricing-button">LET'S GET STARTED</a>
  </div>
</section>