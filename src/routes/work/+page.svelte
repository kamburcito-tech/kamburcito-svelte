<script>
 import '../../styles/20-work.css';
let workHeroCanvasWrap;

  const featuredProjects = [
    {
  eyebrow: 'Featured Project',
  title: 'Wellness Brand Website',
  description:
    'A calming wellness website designed to feel trustworthy, clear, and approachable while guiding visitors toward services and next steps.',
  role: 'Design · Development',
  platform: 'WordPress',
  image: '/images/work/spry-society-work-project.webp',
  link: 'https://thesprysociety.com/',
  cta: 'Visit Website →'
},
{ 
  eyebrow: 'Featured Project',
  title: 'Law Firm Website',
  description:
    'A professional law firm website focused on credibility, clear service pages, and a polished experience for potential clients.',
  role: 'Design · Development',
  platform: 'WordPress',
  image: '/images/work/law-firm-work-project.webp',
  link: 'https://beccarvarela.com/en/',
  cta: 'Visit Website →'
},
 {
      eyebrow: 'Featured Project',
      title: 'Conduct Science',
      description:
        'A scientific eCommerce website built with WordPress and WooCommerce, designed to support a large product catalog, clear navigation, and a stronger buying experience.',
      role: 'Design · Development · WooCommerce',
      platform: 'WordPress / WooCommerce',
      image: '/images/work/conductscience-work-project.webp',
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
      image: '/images/work/surfaceworks-work-project.webp',
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
      image: '/images/work/shady-grove-fertility-work-project.webp',
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
      image: '/images/work/din-law-firm-work-project.webp',
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
      image: '/images/work/takahiro-artist-work-project.webp',
      link: 'https://takahiroogawa.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'FemSculpt Cosmetic Gynecology',
      description:
        'A polished healthcare website for a Chicago cosmetic gynecology practice, designed to present specialized treatments clearly and encourage private consultations.',
      role: 'Design · Development',
      platform: 'WordPress',
      image: '/images/work/femsculpt-work-project.webp',
      link: 'https://femsculpt.com/',
      cta: 'View Live Site →'
    },
    {
      eyebrow: 'Featured Project',
      title: 'Digital Coaching',
      description:
        'A calm, conversion-focused Webflow website for a digital coaching brand, designed to build trust, explain its services clearly, and encourage potential clients to connect.',
      role: 'Design · Development',
      platform: 'Webflow',
      image: '/images/work/lark-work-project.webp',
      link: 'https://www.claritytherapynyc.com/',
      cta: 'View Live Site →'
    }
  ];
</script>

<svelte:head>
  <title>Selected Website Projects | Kamburcito Studio</title>

  <meta
    name="description"
    content="Explore selected websites, redesigns, e-commerce projects, and digital experiences created by Kamburcito Studio."
  />

  <link rel="canonical" href="https://kamburcito.com/work/" />

  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="Selected Website Projects | Kamburcito Studio"
  />
  <meta
    property="og:description"
    content="A collection of custom websites, redesigns, stores, and digital experiences for real businesses."
  />
  <meta property="og:url" content="https://kamburcito.com/work/" />
  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-work-social-preview.jpg"
  />

  <meta name="twitter:card" content="summary_large_image" />
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
        <a href="/get-started" class="btn btn-primary">Start a Project</a>        
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