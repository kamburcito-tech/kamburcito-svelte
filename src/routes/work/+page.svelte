<script>
let workHeroCanvasWrap;

  const featuredProjects = [
    {
  eyebrow: 'Featured Project',
  title: 'Wellness Brand Website',
  description:
    'A calming wellness website designed to feel trustworthy, clear, and approachable while guiding visitors toward services and next steps.',
  role: 'Design · Development',
  platform: 'WordPress',
  image: '/images/spry-society-homepage-project.png',
  link: '#',
  cta: 'Visit Website →'
},
{ 
  eyebrow: 'Featured Project',
  title: 'Law Firm Website',
  description:
    'A professional law firm website focused on credibility, clear service pages, and a polished experience for potential clients.',
  role: 'Design · Development',
  platform: 'WordPress',
  image: '/images/law-firm-work-project.webp',
  link: '#',
  cta: 'Visit Website →'
},
 {
      eyebrow: 'Featured Project',
      title: 'Conduct Science',
      description:
        'A scientific eCommerce website built with WordPress and WooCommerce, designed to support a large product catalog, clear navigation, and a stronger buying experience.',
      role: 'Design · Development · WooCommerce',
      platform: 'WordPress / WooCommerce',
      image: '/images/conductscience-homepage-project.webp',
      link: 'https://conductscience.com/',
      cta: 'View Live Site →'
},
{
      eyebrow: 'Featured Project',
      title: 'SurfaceWorks',
      description:
        'An industrial services website with a cleaner structure, stronger positioning, and a more professional presentation for service-based leads.',
      role: 'Design · Development',
      platform: 'WordPress / Elementor',
      image: '/images/surfaceworks-homepage-project-kamburcito.png',
      link: 'https://surfaceworks.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Shady Grove Fertility',
      description:
        'Healthcare website support focused on visual consistency, content updates, and maintaining a polished user experience across key pages.',
      role: 'Website Support · Design Updates',
      platform: 'WordPress',
      image: '/images/Shady-grove-fertility-homepage-project.webp',
      link: 'https://shadygrovefertility.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Immigration Law Firm Website',
      description:
         'A legal services website built to make immigration support feel clear, organized, and easier for visitors to understand.',
      role: 'Design · Development',
      platform: 'WordPress',
      image: '/images/law-firm-web-design-kamburcito-work.webp',
      link: 'https://lawfirm.com/',
      cta: 'Visit Website →'
},
    {
      eyebrow: 'Featured Project',
      title: 'Takahiro Ogawa',
      description:
        'A personal brand website with a strong editorial feel, designed to showcase creative work with a clean and memorable visual direction.',
      role: 'Design · Squarespace Build',
      platform: 'Squarespace',
      image: '/images/takahiro-ogawa-homepage-project.webp',
      link: 'https://takahiroogawa.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Cruelty-Free Kitty',
      description:
        'A cruelty-free beauty platform with editorial content and shopping-focused sections designed for a clear, useful browsing experience.',
      role: 'Design · Content Site · Shop',
      platform: 'WordPress',
      image: '/images/cruelty-free-homepage-project.webp',
      link: 'https://crueltyfreekitty.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Hayward & Stott',
      description:
        'A luxury homeware eCommerce website with a refined product experience, strong visual presentation, and WooCommerce functionality.',
      role: 'Design · Development · WooCommerce',
      platform: 'WordPress / WooCommerce',
      image: '/images/hayward-stott-homepage-project.webp',
      link: 'https://haywardstott.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Chicago Breast & Body',
      description:
        'A medical aesthetics website with a polished visual direction, service-focused structure, and a stronger patient-facing experience.',
      role: 'Design · Development',
      platform: 'WordPress',
      image: '/images/chicago-breast-homepage-project.webp',
      link: 'https://chicagobreastandbody.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Jamie Ann Hultgren',
      description:
        'A personal brand website built in Squarespace with a simple, professional layout designed to support credibility and connection.',
      role: 'Design · Squarespace Build',
      platform: 'Squarespace',
      image: '/images/jamie-homepage-project.webp',
      link: 'https://jamieannhultgren.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Find a Therapist',
      description:
        'A mental health directory website designed to help users browse providers, understand services, and find support more easily.',
      role: 'Design · Development · Directory',
      platform: 'WordPress',
      image: '/images/find-a-therapist-work-project.webp',
      link: 'https://www.claritytherapynyc.com/',
      cta: 'View Live Site →'
    }
  ];
</script>

<svelte:head>
  <title>Work | Kamburcito Studio</title>
  <meta
    name="description"
    content="Selected websites, redesigns, online stores, and creative builds by Kamburcito Studio."
  />
</svelte:head>
<section class="work-page-hero">
  <div class="wide-container work-hero-inner">
    <p class="eyebrow">Kamburcito</p>

    <h1>
      Our work speaks
      <span>for itself.</span>
    </h1>

    <p>
      We build kick-ass websites that deliver real results for our clients.
      Unique, memorable designs coupled with custom code for blazing-fast performance.
    </p>

    <a href="#featured-work" class="work-hero-button">
      Explore Featured Work
    </a>
  </div>
</section>

<section id="featured-work" class="work-featured-list">
  <div class="wide-container">
    {#each featuredProjects as project, index}
      <article class="work-featured-card">
        <div class="work-featured-image">
          <img src={project.image} alt={project.title} />
        </div>

        <div class="work-featured-content">
          <p class="eyebrow">{project.eyebrow}</p>

          <h2>{project.title}</h2>

          <p>{project.description}</p>

          <div class="work-meta-grid">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>

            <div>
              <span>Platform</span>
              <strong>{project.platform}</strong>
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.cta || 'Visit Live Website →'}
          </a>
        </div>
      </article>
    {/each}
  </div>
</section>

<section id="contact" class="final-cta">
  <div class="wide-container cta-inner">
    <div class="cta-content">
      <p class="eyebrow">Open Studio</p>

      <h2>
        Ready for a website
        <span>that feels like your brand?</span>
      </h2>

      <p>
        Tell me what you’re building or improving. I’ll help you shape it into a polished website
        with clear direction, strong visuals, and a smooth user experience.
      </p>

      <div class="cta-actions">
        <a href="/get-started" class="btn btn-secondary">Start a Project</a>        
      </div>
    </div>
  </div>

  <div class="wide-container available-strip">
    <span>Available for</span>

    <div class="available-list">
      <p>Web Design</p>
      <p>Branding</p>
      <p>Product Design</p>
      <p>Web Development</p>
      <p>Website Redesigns</p>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="wide-container footer-inner">
    <p>Kamburcito Studio</p>
    <p>Web Design & Digital Experiences</p>
    <p>Made by Patricia · 2026</p>
  </div>
</footer>