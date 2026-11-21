<script>
  import { onMount } from 'svelte';
  import '../../styles/10-homepage.css';
  import '../../styles/90-homepage-responsive.css';
  import financialAdvisorImage from '$lib/assets/working_on/financial-advisor-working-on-homepage.webp?enhanced&w=500;360';
  import casaNidoImage from '$lib/assets/working_on/casa-nido-working-on-homepage.webp?enhanced&w=736;500;360';
  import lumaStudioImage from '$lib/assets/working_on/luma-studio-working-on-homepage.webp?enhanced&w=500;360';
  import brunchBloomImage from '$lib/assets/working_on/brunch-and-bloom-working-on-homepage.webp?enhanced&w=500;360';
  import goldenDistrictImage from '$lib/assets/working_on/golden-district-partners-working-on-homepage.webp?enhanced&w=500;360';
  import beachBitesImage from '$lib/assets/working_on/beach-bites-club-working-on-homepage.webp?enhanced&w=500;360';
  import petraValdezImage from '$lib/assets/working_on/petra-valdez-working-on-homepage.webp?enhanced&w=500;360';
  import HeroCardColumns from '$lib/components/HeroCardColumns.svelte';
  import CellsBackground from '$lib/components/CellsBackground.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import { dictionaries } from '$lib/i18n';
  import {
    contactEmail,
    contactEmailHref,
    linkedinHref,
    upworkHref
  } from '$lib/contact.js';

  /** Page copy for one language (src/lib/i18n). */
  /** @type {{ t: typeof import('$lib/i18n/en.js').default }} */
  let { t } = $props();

  // Client-offer sections (Services, Who I help, How it works, Pricing, the process
  // route, Currently working on, testimonials, the manifesto/Three.js band, FAQ and the
  // project CTA) stay in this file but only render when this is true. While false, the
  // manifesto canvas never mounts, so three.js is never downloaded.
  const showClientSections = false;

  // WebGL effects (and three.js) load only on larger screens without reduced motion.
  const WEBGL_MEDIA_QUERY = '(min-width: 721px) and (prefers-reduced-motion: no-preference)';

  let canvas;
  let manifestoSection;
  let aboutSection;

  const structuredData = $derived({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://kamburcito.com/#business',
      name: 'Kamburcito Studio',
      url: 'https://kamburcito.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kamburcito.com/android-chrome-512x512.png'
      },
      image: 'https://kamburcito.com/images/kamburcito-social-preview.webp',
      description: t.home.meta.description,
      founder: {
        '@id': 'https://kamburcito.com/#patricia-diaz'
      },
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR'
      },
      knowsAbout: [
        'Web Design',
        'Web Development',
        'Website Redesign',
        'Responsive Web Design',
        'WordPress Development',
        'SvelteKit Development',
        'E-commerce Website Design',
        'On-page SEO'
      ]
    },
    {
      '@type': 'Person',
      '@id': 'https://kamburcito.com/#patricia-diaz',
      name: 'Patricia Diaz',
      url: 'https://kamburcito.com/',
      jobTitle: t.home.meta.jobTitle,
      description: t.home.meta.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR'
      },
      sameAs: [linkedinHref, upworkHref],
      worksFor: {
        '@id': 'https://kamburcito.com/#business'
      },
      knowsAbout: [
        'Web Design',
        'Front-end Development',
        'WordPress',
        'Elementor',
        'SvelteKit',
        'Tailwind CSS',
        'Responsive Web Design',
        'Website Performance',
        'Core Web Vitals',
        'On-page SEO',
        'HubSpot'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kamburcito.com/#website',
      url: 'https://kamburcito.com/',
      name: 'Kamburcito Studio',
      description: t.home.meta.description,
      publisher: {
        '@id': 'https://kamburcito.com/#business'
      },
      inLanguage: [dictionaries.en.htmlLang, dictionaries.es.htmlLang]
    },
    {
      '@type': 'WebPage',
      '@id': `${t.home.meta.url}#webpage`,
      url: t.home.meta.url,
      name: t.home.meta.title,
      isPartOf: {
        '@id': 'https://kamburcito.com/#website'
      },
      about: {
        '@id': 'https://kamburcito.com/#patricia-diaz'
      },
      inLanguage: t.htmlLang
    }
  ]
});
let audioContext;
  
let dragCursorVisible = $state(false);
let dragCursorX = $state(0);
let dragCursorY = $state(0);
let isDragging = $state(false);

let startX = 0;
let scrollLeft = 0;
let studioScroll;

function showDragCursor(event) {
  if (event.pointerType !== 'mouse') return;
  dragCursorVisible = true;
  moveDragCursor(event);
}

function hideDragCursor() {
  dragCursorVisible = false;
  isDragging = false;
}

function moveDragCursor(event) {
  dragCursorX = event.clientX;
  dragCursorY = event.clientY;
}

function startDrag(event) {
  if (!studioScroll || event.pointerType !== 'mouse' || event.button !== 0) return;

  isDragging = true;
  startX = event.pageX - studioScroll.offsetLeft;
  scrollLeft = studioScroll.scrollLeft;
}
function stopDrag() {
  isDragging = false;
}

function dragScroll(event) {
  if (event.pointerType !== 'mouse') return;
  moveDragCursor(event);

  if (!isDragging || !studioScroll) return;

  event.preventDefault();

  const x = event.pageX - studioScroll.offsetLeft;
  const walk = (x - startX) * 1.4;

  studioScroll.scrollLeft = scrollLeft - walk;
}

function handleStudioKeydown(event) {
  if (!studioScroll) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    studioScroll.scrollBy({
      left: 320,
      behavior: 'smooth'
    });
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    studioScroll.scrollBy({
      left: -320,
      behavior: 'smooth'
    });
  }
}

  const studioCards = [
  {
    title: 'Financial Consultant Website',
    subtitle: 'Financial Advisor ',
    status: 'In progress',
    image: financialAdvisorImage,
  },
  {
    title: 'Casa Nido',
    subtitle: 'Real Estate Agency',
    status: 'In progress',
    image: casaNidoImage,
  },
  {
    title: 'Luma Studio',
    subtitle: 'Home Decor Store',
    status: 'In progress',
    image: lumaStudioImage,
  },
  {
    title: 'Brunch & Bloom',
    subtitle: 'Cafe & Brunch Spot',
    status: 'In progress',
    image: brunchBloomImage,
  },
  {
    title: 'Golden District Partners',
    subtitle: 'B2B Consulting Firm',
    status: 'In progress',
    image: goldenDistrictImage,
  },
  {
    title: 'Beach Bites Club',
    subtitle: 'Beach Bar & Restaurant',
    status: 'In progress',
    image: beachBitesImage,
  },
  {
    title: 'Petra Valdez',
    subtitle: 'Jewelry & Accesories Store',
    status: 'In Development',
    image: petraValdezImage,
  },
];

  // Services honeycomb. `col` / `row` place each hexagon on the desktop board
  // (columns step 0.75 of a hexagon across, rows step half a hexagon down).
  const services = [
    {
      title: 'Website design and development',
      text: 'Custom sites built to look credible and turn visitors into inquiries.',
      tone: 'teal',
      col: 0,
      row: 1,
      icon: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18M8 21h8M12 17v4"/>'
    },
    {
      title: 'SEO',
      text: 'Service pages, local search basics and structure that gets you found.',
      tone: 'dark',
      col: 2,
      row: 1,
      icon: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.35-4.35"/>'
    },
    {
      title: 'Content and AI content',
      text: 'Articles and pages in your brand voice, reviewed by a person before they go live.',
      tone: 'teal',
      col: 4,
      row: 1,
      icon: '<path d="M14 3H6v18h12V9"/><path d="M9 13h6M9 17h4"/><path d="M18 2v4M16 4h4"/>'
    },
    {
      title: 'Healthcare advertising',
      text: 'Landing pages and Google and Meta campaigns that bring in new patients.',
      tone: 'dark',
      col: 1,
      row: 2,
      icon: '<path d="M3 10.5v3a1 1 0 0 0 1 1h2.5L12 19V5L6.5 9.5H4a1 1 0 0 0-1 1z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>'
    },
    {
      title: 'Lead follow-up',
      text: 'Forms that work, plus HubSpot emails, reminders and follow-up.',
      tone: 'teal',
      col: 3,
      row: 2,
      icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'
    },
    {
      title: 'Brand and imagery',
      text: 'Logo, colors, type and product or service visuals.',
      tone: 'teal',
      col: 0,
      row: 3,
      icon: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-7.8-9-7.8z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/>'
    },
    {
      title: 'Speed and care',
      text: 'Core Web Vitals tuning and an optional monthly plan for updates.',
      tone: 'dark',
      col: 2,
      row: 3,
      icon: '<path d="M4.5 18a9 9 0 1 1 15 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1"/>'
    },
    {
      title: 'On-demand services',
      text: 'Tailor-made help for anything else your practice needs.',
      tone: 'gold',
      col: 4,
      row: 3,
      icon: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M5.6 18.4l2.9-2.9M15.5 8.5l2.9-2.9"/>'
    }
  ];

  // Empty tint hexagons that complete the honeycomb edges (decoration only).
  const serviceDecor = [
    { col: 3, row: 0 },
    { col: 1, row: 4 }
  ];

  // "Who I help" tiles. Paths with class="accent" are drawn in champagne.
  const specialties = [
    {
      name: 'Plastic surgery',
      icon: '<path d="M12 3C8.4 3 6 5.8 6 9.8c0 4.4 2.7 8.4 6 10.2 3.3-1.8 6-5.8 6-10.2C18 5.8 15.6 3 12 3z"/><path class="accent" d="M9.5 14c1.5 1.1 3.5 1.1 5 0"/><path d="M9.5 10h.01M14.5 10h.01"/>'
    },
    {
      name: 'Cosmetic surgery',
      icon: '<path d="M11 3.5 12.7 8.3 17.5 10l-4.8 1.7L11 16.5l-1.7-4.8L4.5 10l4.8-1.7z"/><path class="accent" d="M18 15v5M15.5 17.5h5"/>'
    },
    {
      name: 'Bariatric surgery',
      icon: '<path d="M9 3v3.5c0 1.6-1.2 2.4-2.2 3.4C5.7 11 5 12.4 5 14.5A6.5 6.5 0 0 0 11.5 21h1A6.5 6.5 0 0 0 19 14.5c0-2.2-1.3-3.7-3.2-3.7-1.7 0-2.4 1.4-3.8 1.4"/><path class="accent" d="M8 3h3"/>'
    },
    {
      name: 'Gynecology and women’s health',
      icon: '<path d="M9.5 7.5c0-1.4-1.1-2.5-2.5-2.5S4 6.3 4 8.3c0 1.5.9 2.7 2.2 3.2"/><path d="M14.5 7.5c0-1.4 1.1-2.5 2.5-2.5s3 1.3 3 3.3c0 1.5-.9 2.7-2.2 3.2"/><path d="M9.5 7.5v5a2.5 2.5 0 0 0 5 0v-5c0-1-1.1-1.5-2.5-1.5s-2.5.5-2.5 1.5z"/><path class="accent" d="M12 15v6"/>'
    },
    {
      name: 'Psychology',
      icon: '<path d="M14 21v-3h2.5a2 2 0 0 0 2-2v-2.5L20 13l-1.5-2.5A7.5 7.5 0 1 0 6 16v5"/><path class="accent" d="M10 8.5a2.2 2.2 0 0 1 4.2 1c0 1.4-1.7 1.8-1.7 3"/>'
    },
    {
      name: 'Urology',
      icon: '<path d="M14.5 4C10.8 2.8 6 5 6 11.2S9.9 21.5 13.4 20c2-.9 1.6-3.3.4-4.6-1-1.1-1-2.7.1-3.7 1.5-1.4 3.8-1.4 3.9-3.6.1-1.8-1.4-3.4-3.3-4.1z"/><path class="accent" d="M14 11.5c-1.3.4-2.4 1.6-2.8 3.5"/>'
    },
    {
      name: 'Endocrinology',
      icon: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path class="accent" d="M9.5 14.5A2.5 2.5 0 0 0 12 17"/>'
    },
    {
      name: 'Cruelty-free beauty',
      icon: '<path d="M5 19c0-8.3 5.2-13.4 14-14-.6 8.8-5.7 14-14 14z"/><path class="accent" d="m5 19 8-8"/>'
    },
    {
      name: 'Life sciences and laboratory',
      icon: '<path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path class="accent" d="M7.3 15h9.4"/>'
    },
    {
      name: 'Law firms',
      icon: '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/><path d="M19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/><path class="accent" d="M10.5 4h3"/>'
    }
  ];

  const steps = [
    {
      title: 'Free review or call',
      text: 'We talk about your practice, your clients and what the site has to do.'
    },
    {
      title: 'Fixed quote in writing',
      text: 'Scope, price and revision rounds agreed before I start.'
    },
    {
      title: 'Design and build',
      text: 'You see the design first, then the working site, with agreed review rounds.'
    },
    {
      title: 'Launch and support',
      text: 'I test, launch and stay available. An optional care plan covers updates and fixes.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'from $1,800',
      text: 'About 5 pages, mobile design, contact form and speed setup.'
    },
    {
      name: 'Standard',
      price: 'from $3,500',
      text: 'Up to about 10 pages, plus HubSpot follow-up or a bilingual setup.'
    },
    {
      name: 'Custom',
      price: 'from $6,000',
      text: 'Galleries, integrations and larger sites, quoted after a call.'
    },
    {
      name: 'Care plan',
      price: '$120 to $200 a month',
      text: 'Updates, backups, fixes and speed checks.'
    }
  ];

  const faqs = [
    {
      question: 'How much does a website cost?',
      answer:
        'Fixed-price projects start from $1,800. You get a written quote before we start, listing exactly what’s included.'
    },
    {
      question: 'How long does it take?',
      answer:
        'It depends on the size of the project and how quickly content and feedback arrive. Your written quote includes a timeline.'
    },
    {
      question: 'Do you work with clients outside Argentina?',
      answer:
        'Yes. I work with clients in the US and elsewhere, in English and Spanish, and I schedule calls in your time zone.'
    },
    {
      question: 'Can I edit the site myself?',
      answer:
        'Yes. Sites are built so your team can update text, images and pages without a developer.'
    },
    {
      question: 'Do you handle legal or medical compliance?',
      answer:
        'I build forms and pages following common best practices and can work with your counsel. Advertising and privacy compliance stays the client’s responsibility.'
    },
    {
      question: 'What do you need from me?',
      answer: 'Your content and photos, or I can help shape them. We agree this in the quote.'
    },
    {
      question: 'What happens after launch?',
      answer:
        'I test, launch and stay available. An optional care plan covers updates, backups and fixes.'
    }
  ];

  // Selected work rail on the home page (static screenshots from static/images/work).
  const projectData = [
    {
      id: 'femsculpt',
      title: 'FemSculpt',
      image: '/images/work/femsculpt-work-project.webp',
      url: 'https://femsculpt.com/'
    },
    {
      id: 'immigration-law-dfw',
      title: 'Immigration Law DFW',
      image: '/images/work/din-law-firm-work-project.webp',
      url: 'https://immigrationlawdfw.com/'
    },
    {
      id: 'beccar-varela',
      title: 'Beccar Varela',
      image: '/images/work/law-firm-work-project.webp',
      url: 'https://beccarvarela.com/en/'
    },
    {
      id: 'nc-builders',
      title: 'NC Builders',
      image: '/images/work/nc-builders-work-project.webp',
      url: 'https://ncbuilders.biz/'
    },
    {
      id: 'shady-grove',
      title: 'Shady Grove Fertility',
      image: '/images/work/shady-grove-fertility-work-project.webp',
      url: 'https://shadygrovefertility.com/'
    }
  ];

  const projects = $derived(
    projectData.map((project) => ({ ...project, ...t.home.work.projects[project.id] }))
  );

  const skillGroups = $derived(t.home.skills.groups);

  let workRail;
  let workCycle = 0;
  let workStep = 0;
  let workAutoplayFrame = 0;
  let workNavigationFrame = 0;
  let workInteracted = false;
  let workHovered = false;
  let workFocused = false;
  let workReducedMotion;
  let workTouchFirst;
  let workDragStartX = null;
  let workDragScrollLeft = 0;
  let workDragged = false;

  function measureWork() {
    const cards = workRail?.querySelectorAll('.project-card');
    if (!cards || cards.length < projects.length + 1) return;

    const cycle = cards[projects.length].offsetLeft - cards[0].offsetLeft;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const position = workStep ? (workRail.scrollLeft - workCycle) / workStep : 0;
    workCycle = cycle;
    workStep = step;
    workRail.scrollLeft = cycle + position * step;
  }

  function normalizeWorkScroll() {
    if (!workRail || !workCycle || workNavigationFrame) return 0;
    let shift = 0;
    if (workRail.scrollLeft < workCycle) shift = workCycle;
    if (workRail.scrollLeft >= workCycle * 2) shift = -workCycle;
    if (shift) {
      workRail.scrollLeft += shift;
      workDragScrollLeft += shift;
    }
    return shift;
  }

  function stopWorkAutoplay() {
    cancelAnimationFrame(workAutoplayFrame);
    workAutoplayFrame = 0;
  }

  function startWorkAutoplay() {
    if (
      workAutoplayFrame || !workRail || !workCycle || workInteracted ||
      workHovered || workFocused || document.hidden ||
      workReducedMotion?.matches || workTouchFirst?.matches
    ) return;

    let previous = 0;
    function frame(now) {
      if (previous) {
        workRail.scrollLeft += (workCycle / 42000) * Math.min(now - previous, 64);
        normalizeWorkScroll();
      }
      previous = now;
      workAutoplayFrame = requestAnimationFrame(frame);
    }
    workAutoplayFrame = requestAnimationFrame(frame);
  }

  function syncWorkAutoplay() {
    stopWorkAutoplay();
    startWorkAutoplay();
  }

  function stopWorkForUser() {
    workInteracted = true;
    stopWorkAutoplay();
    cancelAnimationFrame(workNavigationFrame);
    workNavigationFrame = 0;
  }

  function navigateWork(direction) {
    if (!workRail || !workStep) return;
    stopWorkForUser();
    const from = workRail.scrollLeft;
    const index = Math.round((from - workCycle) / workStep);
    const to = workCycle + (index + direction) * workStep;
    if (workReducedMotion?.matches) {
      workRail.scrollLeft = to;
      normalizeWorkScroll();
      return;
    }

    let started;
    function frame(now) {
      started ??= now;
      const progress = Math.min((now - started) / 550, 1);
      workRail.scrollLeft = from + (to - from) * (1 - (1 - progress) ** 3);
      if (progress < 1) {
        workNavigationFrame = requestAnimationFrame(frame);
      } else {
        workNavigationFrame = 0;
        normalizeWorkScroll();
      }
    }
    workNavigationFrame = requestAnimationFrame(frame);
  }

  function handleWorkKeydown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    navigateWork(event.key === 'ArrowRight' ? 1 : -1);
  }

  function startWorkDrag(event) {
    stopWorkForUser();
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    workDragStartX = event.clientX;
    workDragScrollLeft = workRail.scrollLeft;
    workDragged = false;
  }

  function moveWorkDrag(event) {
    if (workDragStartX === null || event.buttons !== 1) return;
    const distance = event.clientX - workDragStartX;
    if (!workDragged && Math.abs(distance) < 6) return;
    workDragged = true;
    event.preventDefault();
    workRail.scrollLeft = workDragScrollLeft - distance;
    normalizeWorkScroll();
  }

  function endWorkDrag() {
    workDragStartX = null;
    if (workDragged) setTimeout(() => { workDragged = false; }, 0);
  }

  function handleWorkClick(event) {
    if (!workDragged) return;
    event.preventDefault();
    event.stopPropagation();
    workDragged = false;
  }

  onMount(() => {
    workReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    workTouchFirst = matchMedia('(hover: none), (pointer: coarse), (max-width: 720px)');
    const observer = new ResizeObserver(measureWork);
    observer.observe(workRail);
    observer.observe(workRail.querySelector('.project-card'));
    measureWork();
    workReducedMotion.addEventListener('change', syncWorkAutoplay);
    workTouchFirst.addEventListener('change', syncWorkAutoplay);
    document.addEventListener('visibilitychange', syncWorkAutoplay);
    startWorkAutoplay();

    return () => {
      stopWorkAutoplay();
      cancelAnimationFrame(workNavigationFrame);
      observer.disconnect();
      workReducedMotion.removeEventListener('change', syncWorkAutoplay);
      workTouchFirst.removeEventListener('change', syncWorkAutoplay);
      document.removeEventListener('visibilitychange', syncWorkAutoplay);
    };
  });

  const process = [
    {
      step: '01',
      title: 'Discover',
      text: 'We talk about your business, goals, audience, and ideas.'
    },
    {
      step: '02',
      title: 'Design',
      text: 'I develop the visual direction, layout, and overall experience.'
    },
    {
      step: '03',
      title: 'Build',
      text: 'Your design becomes a responsive, functional website.'
    },
    {
      step: '04',
      title: 'Refine',
      text: 'We review, test, and polish the details together.'
    },
    {
      step: '05',
      title: 'Launch',
      text: 'Your website goes live, ready to share with the world.'
    }
  ];

  let processList;

  onMount(() => {
    if (!processList) return;
    const markers = [...processList.querySelectorAll('.process-marker')];
    const steps = [...processList.querySelectorAll('.process-step')];
    const path = processList.querySelector('.process-route__fill');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 760px)');
    let positions = [];
    let thresholds = [];
    let routeLength = 0;
    let visible = false;
    let frame = 0;

    function measure() {
      positions = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
      const span = positions.at(-1) - positions[0] || 1;
      if (mobile.matches) {
        thresholds = positions.map((position) => (position - positions[0]) / span);
      } else {
        routeLength = path.getTotalLength();
        path.style.strokeDasharray = `${routeLength} ${routeLength}`;
        const bottomStart = routeLength - 765;
        thresholds = [0, 310 / routeLength, 620 / routeLength,
          (bottomStart + 145) / routeLength, (bottomStart + 615) / routeLength];
      }
      requestProgress();
    }

    function updateProgress() {
      frame = 0;
      const span = positions.at(-1) - positions[0] || 1;
      const progress = reducedMotion.matches
        ? 1
        : Math.max(0, Math.min(1,
          (window.innerHeight * 0.72 - (positions[0] - window.scrollY)) / span));
      processList.style.setProperty('--process-progress', progress);
      if (!mobile.matches) path.style.strokeDashoffset = `${routeLength * (1 - progress)}`;
      steps.forEach((step, index) => {
        step.classList.toggle('is-reached', progress >= thresholds[index]);
      });
    }

    function requestProgress() {
      if (frame) return;
      frame = requestAnimationFrame(updateProgress);
    }

    function sync() {
      window.removeEventListener('scroll', requestProgress);
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && !reducedMotion.matches) {
        window.addEventListener('scroll', requestProgress, { passive: true });
      }
      requestProgress();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { rootMargin: '200px 0px' });
    const resizeObserver = new ResizeObserver(measure);
    processList.classList.add('process-enhanced');
    observer.observe(processList);
    resizeObserver.observe(processList);
    reducedMotion.addEventListener('change', sync);
    mobile.addEventListener('change', measure);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure, { once: true });
    measure();

    return () => {
      window.removeEventListener('scroll', requestProgress);
      window.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      mobile.removeEventListener('change', measure);
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  onMount(() => {
    if (!aboutSection || !('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = aboutSection;
    if (section.getBoundingClientRect().top < innerHeight * 0.8) return;

    section.classList.add('is-pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(section);

    return () => observer.disconnect();
  });

  const testimonials = [
    
  {
    name: 'Maya Thompson',
    role: 'Founder, Bloom Wellness Studio',
     image: '/images/testimonials/Maya-testimonials-homepage.webp',
    quote:
      'Patricia made the whole website process feel easy. I came in with a messy idea, and she turned it into a polished site that feels calm, professional, and totally aligned with my brand.'
  },
  {
    name: 'Daniel Rivera',
    role: 'Creative Director, Rivera Studio',
    image: '/images/testimonials/daniel-testimonials-homepage.webp',
    quote:
      'My portfolio finally looks like the level of work I actually do. The design feels modern, confident, and memorable without being overcomplicated.'
  },
  {
    name: 'Aisha Bennett',
    role: 'Owner, Kind Roots Café',
    image: '/images/testimonials/aisha-testimonials-homepage.webp',
    quote:
      'I needed a website that felt warm and easy to use. Kamburcito Studio gave me something beautiful, clear, and ready to share with customers.'
  },
  {
    name: 'Lucas Morgan',
    role: 'Real Estate Consultant',
    image: '/images/testimonials/lucas-testimonials-homepage.webp',
    quote:
      'The site feels more premium than I expected. It helped me present my services clearly and gave my business a much stronger first impression.'
  },
  {
    name: 'Sofia Herrera',
    role: 'Founder, Casa Nido Realty',
    image: '/images/testimonials/sofia-testimonials-homepage.webp',
    quote:
      'Patricia understood the feeling I wanted right away. The website feels editorial, trustworthy, and elegant — exactly what I needed for my brand.'
  },
  {
    name: 'Ethan Brooks',
    role: 'Business Coach',
    image: '/images/testimonials/ethan-testimonials-homepage.webp',
    quote:
      'I finally have a website that explains what I do without overwhelming people. The structure, copy flow, and design all feel intentional.'
  },
  {
    name: 'Nadia Rahman',
    role: 'Jewelry Designer, Noura Atelier',
    image: '/images/testimonials/nadia-testimonials-homepage.webp',
    quote:
      'The visual direction was stunning. My products feel more elevated online now, and the whole site feels like a real brand experience.'
  },
  {
    name: 'Mateo Collins',
    role: 'Founder, Northline Builders',
    image: '/images/testimonials/mateo-testimonials-homepage.webp',
    quote:
      'Our old website felt outdated and forgettable. The new direction feels sharp, trustworthy, and much more aligned with the kind of clients we want.'
  },
  {
    name: 'Isabella Chen',
    role: 'Marketing Consultant',
    image: '/images/testimonials/isabella-testimonials-homepage.webp',
    quote:
      'Kamburcito Studio brought clarity to everything. The final site feels strategic, polished, and easy for potential clients to understand.'
  },
  {
    name: 'Julian Carter',
    role: 'Photographer',
    image: '/images/testimonials/julian-testimonials-homepage.webp',
    quote:
      'I wanted a portfolio that didn’t feel generic. Patricia created something clean, bold, and visual without distracting from my work.'
  },
  {
    name: 'Amara Lewis',
    role: 'Founder, The Soft Space',
    image: '/images/testimonials/amara-testimonials-homepage.webp',
    quote:
      'The website feels exactly like my brand: soft, modern, and professional. I felt supported through the whole process.'
  },
  {
    name: 'Noah Bennett',
    role: 'SaaS Founder',
    image: '/images/testimonials/noah-testimonials-homepage.webp',
    quote:
      'The landing page helped us explain our product much more clearly. It looks polished, loads fast, and feels more credible.'
  },
  {
    name: 'Camila Torres',
    role: 'Beauty Brand Founder',
    image: '/images/testimonials/camila-testimonials-homepage.webp',
    quote:
      'I loved how thoughtful the design process was. The final website feels elevated, feminine, and easy to shop.'
  },
  {
    name: 'Owen Mitchell',
    role: 'Founder, Golden District Partners',
    image: '/images/testimonials/owen-testimonials-homepage.webp',
    quote:
      'The site gave our consulting brand the credibility it was missing. It feels professional without feeling cold or corporate.'
  },
  {
    name: 'Leila Martins',
    role: 'Interior Designer',
    image: '/images/testimonials/leila-testimonials-homepage.webp',
    quote:
      'My website finally feels like my design style. It is elegant, spacious, and easy for clients to browse.'
  },
  ];
 const testimonialColumns = [[], [], []];

  testimonials.forEach((testimonial, index) => {
    testimonialColumns[index % 3].push(testimonial);
  });
  

  function playProjectSound() {
  if (typeof window === 'undefined') return;

  audioContext = audioContext || new AudioContext();

  const now = audioContext.currentTime;

  const notes = [440, 660, 880];

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.045);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + 0.35);

    gain.gain.setValueAtTime(0, now + index * 0.045);
    gain.gain.linearRampToValueAtTime(0.032, now + index * 0.045 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.045 + 0.32);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now + index * 0.045);
    oscillator.stop(now + index * 0.045 + 0.34);
  });
}

  onMount(() => {
  if (!window.matchMedia(WEBGL_MEDIA_QUERY).matches) return;

  if (!canvas || !manifestoSection) return;

  let cancelled = false;
  let cleanupManifesto;

  async function initManifesto() {
    const THREE = await import('three');

    if (cancelled) return;

    const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

  const manifestoMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  let manifestoPrefersReducedMotion = manifestoMotionQuery.matches;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: null },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
      uMotion: { value: manifestoPrefersReducedMotion ? 0 : 1 }
    },
    transparent: true,
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;

      void main() {
        vUv = uv;

        vec3 pos = position;
        pos.z += sin(pos.x * 8.0 + uTime * 0.6) * 0.015;
        pos.z += sin(pos.y * 6.0 + uTime * 0.4) * 0.015;

        gl_Position = vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      uniform float uMotion;

      varying vec2 vUv;

      float noise(vec2 p) {
        return sin(p.x * 18.0 + uTime) * sin(p.y * 14.0 + uTime * 0.8);
      }

      void main() {
        vec2 baseUv = vUv;
        vec2 uv = vUv;

        /* -----------------------------------------
           Preserve image ratio like object-fit: cover
        ------------------------------------------ */
        float imageAspect = uImageResolution.x / uImageResolution.y;
        float canvasAspect = uResolution.x / uResolution.y;

        if (canvasAspect > imageAspect) {
          float scale = imageAspect / canvasAspect;
          uv.y = (uv.y - 0.5) * scale + 0.5 + (1.0 - scale) * 0.07;
        } else {
          float scale = canvasAspect / imageAspect;
          uv.x = (uv.x - 0.5) * scale + 0.5;
        }

        /* Keep the gallery structure still; animate only the LED wall interior. */
        float wallMask = uMotion
          * smoothstep(0.08, 0.16, uv.x)
          * (1.0 - smoothstep(0.84, 0.92, uv.x))
          * smoothstep(0.48, 0.56, uv.y)
          * (1.0 - smoothstep(0.76, 0.84, uv.y));

        /* -----------------------------------------
           Slow cinematic drift — softer than before
        ------------------------------------------ */
        uv.x += sin(uv.y * 8.0 + uTime * 0.45) * 0.010 * wallMask;
        uv.y += cos(uv.x * 6.0 + uTime * 0.35) * 0.008 * wallMask;

        /* -----------------------------------------
           Liquid distortion — reduced
        ------------------------------------------ */
        float n = noise(uv * 2.0);
        uv += n * 0.010 * wallMask;

        /* -----------------------------------------
           Mouse ripple — reduced
        ------------------------------------------ */
        float mouseDist = distance(baseUv, uMouse);
        float ripple = smoothstep(0.42, 0.0, mouseDist);

        if (mouseDist > 0.001) {
          uv += normalize(baseUv - uMouse) * 0.018 * ripple * wallMask;
        }

        /* -----------------------------------------
           Subtle RGB split
        ------------------------------------------ */
        vec2 rgbOffset = vec2(0.003 * ripple, 0.0015 * ripple) * wallMask;

        float r = texture2D(uTexture, uv + rgbOffset).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv - rgbOffset).b;

        vec4 color = vec4(r, g, b, 1.0);

        /* -----------------------------------------
           Very subtle breathing glow
        ------------------------------------------ */
        color.rgb *= 1.0 + sin(uTime * 0.8) * 0.03 * wallMask;

        /* -----------------------------------------
           Subtle edge vignette
        ------------------------------------------ */
        float dist = distance(baseUv, vec2(0.5));
        float vignette = 1.0 - smoothstep(0.38, 0.90, dist);
        color.rgb *= mix(0.92, 1.0, vignette);

        gl_FragColor = color;
      }
    `
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const textureLoader = new THREE.TextureLoader();

let animationFrame = null;
let destroyed = false;
let textureReady = false;
let sectionVisible = false;

const renderOnce = () => {
  if (destroyed || !textureReady) return;

  renderer.render(scene, camera);
};

const shouldAnimate = () => {
  return (
    !destroyed &&
    textureReady &&
    !manifestoPrefersReducedMotion &&
    sectionVisible &&
    !document.hidden
  );
};

const stopAnimation = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
};

const animate = () => {
  if (!shouldAnimate()) {
    animationFrame = null;
    return;
  }

  material.uniforms.uTime.value += 0.018;

  renderer.render(scene, camera);

  animationFrame = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (
    animationFrame !== null ||
    !shouldAnimate()
  ) {
    return;
  }

  animationFrame = requestAnimationFrame(animate);
};

const texture = textureLoader.load(
  '/images/neon_aurora_in_a_futuristic_gallery.webp',

  (loadedTexture) => {
    if (destroyed) {
      loadedTexture.dispose();
      return;
    }

    const image = loadedTexture.image;

    material.uniforms.uTexture.value =
      loadedTexture;

    if (image) {
      material.uniforms.uImageResolution.value.set(
        image.naturalWidth || image.width,
        image.naturalHeight || image.height
      );
    }

    textureReady = true;

    renderOnce();
    startAnimation();
  }
);

texture.colorSpace = THREE.SRGBColorSpace;
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

material.uniforms.uTexture.value = texture;

const resize = () => {
  if (
    destroyed ||
    !manifestoSection
  ) {
    return;
  }

  const width =
    manifestoSection.clientWidth;

  const height =
    manifestoSection.clientHeight;

  if (!width || !height) return;

  renderer.setSize(
    width,
    height,
    false
  );

  material.uniforms.uResolution.value.set(
    width,
    height
  );

  renderOnce();
};

const handleManifestoMouseMove = (event) => {
  if (manifestoPrefersReducedMotion) return;

  const rect =
    manifestoSection.getBoundingClientRect();

  material.uniforms.uMouse.value.x =
    (event.clientX - rect.left) /
    rect.width;

  material.uniforms.uMouse.value.y =
    1 -
    (event.clientY - rect.top) /
      rect.height;
};

const handleManifestoMotionChange = (event) => {
  manifestoPrefersReducedMotion = event.matches;
  material.uniforms.uMotion.value = manifestoPrefersReducedMotion ? 0 : 1;

  if (manifestoPrefersReducedMotion) {
    stopAnimation();

    material.uniforms.uMouse.value.set(
      0.5,
      0.5
    );

    renderOnce();
  } else {
    startAnimation();
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAnimation();
  } else {
    startAnimation();
  }
};

const manifestoObserver =
  new IntersectionObserver(
    ([entry]) => {
      sectionVisible =
        entry.isIntersecting;

      if (sectionVisible) {
        renderOnce();
        startAnimation();
      } else {
        stopAnimation();
      }
    },
    {
      threshold: 0.01
    }
  );

resize();

window.addEventListener(
  'resize',
  resize
);

document.addEventListener(
  'visibilitychange',
  handleVisibilityChange
);

manifestoSection.addEventListener(
  'mousemove',
  handleManifestoMouseMove
);

manifestoMotionQuery.addEventListener(
  'change',
  handleManifestoMotionChange
);

manifestoObserver.observe(
  manifestoSection
);

    return () => {
      destroyed = true;

      stopAnimation();

      window.removeEventListener(
        'resize',
        resize
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      manifestoSection.removeEventListener(
        'mousemove',
        handleManifestoMouseMove
      );

      manifestoMotionQuery.removeEventListener(
        'change',
        handleManifestoMotionChange
      );

      manifestoObserver.disconnect();

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }

  initManifesto().then((cleanup) => {
    if (cancelled) {
      cleanup?.();
    } else {
      cleanupManifesto = cleanup;
    }
  });

  return () => {
    cancelled = true;
    cleanupManifesto?.();
  };
});
</script>

<svelte:head>
  <title>{t.home.meta.title}</title>

  <meta
    name="description"
    content={t.home.meta.description}
  />

  <link rel="canonical" href={t.home.meta.url} />
  <link rel="alternate" hreflang="en" href={dictionaries.en.home.meta.url} />
  <link rel="alternate" hreflang="es-AR" href={dictionaries.es.home.meta.url} />
  <link rel="alternate" hreflang="x-default" href={dictionaries.en.home.meta.url} />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content={t.ogLocale} />
  <meta
    property="og:locale:alternate"
    content={t.lang === 'en' ? dictionaries.es.ogLocale : dictionaries.en.ogLocale}
  />
  <meta
    property="og:title"
    content={t.home.meta.title}
  />
  <meta
    property="og:description"
    content={t.home.meta.description}
  />
  <meta property="og:url" content={t.home.meta.url} />
  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content={t.home.meta.title}
  />
  <meta
    name="twitter:description"
    content={t.home.meta.description}
  />
  <meta
    name="twitter:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>
<div class="liquid-cursor"></div>

<main>
  <section class="hero-cinematic" aria-labelledby="home-hero-title">
    <div class="hero-cinematic__content">
      <div class="hero-cinematic__inner">
        <p class="hero-cinematic__eyebrow">{t.home.hero.eyebrow}</p>

        <h1 id="home-hero-title">
          {t.home.hero.title}
        </h1>

        <p class="hero-cinematic__subtitle">
          {t.home.hero.subtitle}
        </p>

        <p class="hero-cinematic__note">{t.home.hero.note}</p>

        <div class="hero-actions">
          <a href={t.home.hero.workHref} class="btn btn-primary">{t.home.hero.work}</a>
          <a
            href="/Patricia-Diaz-CV.pdf"
            class="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.home.hero.cv}
          </a>
        </div>
      </div>
    </div>
    <div class="hero-cinematic__visual">
      <HeroCardColumns t={t.carousel} />
    </div>
    <a
      href="#work"
      class="hero-cinematic__scroll"
      aria-label={t.home.hero.scrollAria}
    >
      <span>{t.home.hero.scroll}</span>
      <span aria-hidden="true">↓</span>
    </a>
  </section>

  {#if showClientSections}
  <section id="services" class="home-hex" aria-labelledby="services-title">
    <div class="wide-container">
      <header class="home-hex__heading">
        <p class="home-kicker">Services</p>
        <h2 id="services-title">Everything your practice needs online.</h2>
        <p class="home-lead">One person to talk to, from first call to launch.</p>
      </header>

      <div class="home-hex__board">
        <ul class="home-hex__grid">
          {#each services as service (service.title)}
            <li class="home-hex__cell" style:--col={service.col} style:--row={service.row}>
              <a class="home-hex__item home-hex__item--{service.tone}" href="/get-started/">
                <div class="home-hex__shape">
                  <svg class="home-hex__icon" viewBox="0 0 24 24" aria-hidden="true">
                    {@html service.icon}
                  </svg>
                  <h3 class="home-hex__title">{service.title}</h3>
                  <p class="home-hex__text">{service.text}</p>
                </div>
              </a>
            </li>
          {/each}
        </ul>
        {#each serviceDecor as decor (`${decor.col}-${decor.row}`)}
          <span
            class="home-hex__decor"
            style:--col={decor.col}
            style:--row={decor.row}
            aria-hidden="true"
          ></span>
        {/each}
      </div>
    </div>
  </section>

  <section id="who-i-help" class="home-sectors" aria-labelledby="who-i-help-title">
    <div class="wide-container">
      <header class="home-sectors__heading">
        <p class="home-kicker">Who I help</p>
        <h2 id="who-i-help-title">Your specialty meets effective web design and marketing.</h2>
        <p class="home-lead">
          I’m a solo specialist, so you always talk to the person doing the work.
          I’ve built sites and content for practices and brands in these areas:
        </p>
      </header>

      <ul class="home-sectors__grid">
        {#each specialties as specialty (specialty.name)}
          <li class="home-sectors__tile">
            <svg class="home-sectors__icon" viewBox="0 0 24 24" aria-hidden="true">
              {@html specialty.icon}
            </svg>
            <span>{specialty.name}</span>
          </li>
        {/each}
      </ul>

      <p class="home-sectors__more">
        Don’t see your specialty?
        <a href="/get-started/">Tell me about your practice.</a>
      </p>
    </div>
  </section>

  <section id="how-it-works" class="services-section home-steps" aria-labelledby="how-it-works-title">
    <div class="wide-container">
      <header class="services-heading">
        <h2 id="how-it-works-title">How it works</h2>
      </header>

      <ol class="home-steps__list">
        {#each steps as step, index (step.title)}
          <li class="home-steps__item">
            <div class="home-steps__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <section id="pricing" class="services-section home-pricing" aria-labelledby="pricing-title">
    <div class="wide-container">
      <header class="services-heading">
        <h2 id="pricing-title">Fixed prices, no surprises</h2>
        <p>Every quote is in writing and lists exactly what’s included.</p>
      </header>

      <table class="home-pricing__table">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Price</th>
            <th scope="col">What’s included</th>
          </tr>
        </thead>
        <tbody>
          {#each pricingPlans as plan (plan.name)}
            <tr>
              <th scope="row">{plan.name}</th>
              <td class="home-pricing__price">{plan.price}</td>
              <td>{plan.text}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <p class="home-pricing__note">Prices are in USD.</p>
    </div>
  </section>

  <section id="process" class="section process-section" aria-labelledby="process-title">
    <div class="wide-container process-container">
      <header class="process-heading">
        <p class="eyebrow">The way I work</p>
        <h2 id="process-title">From an idea to something real.</h2>
        <p class="process-heading__subtitle">
          A thoughtful process, from our first conversation to launch day.
        </p>
      </header>

      <div class="process-list" bind:this={processList}>
        <svg class="process-route" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
          <path class="process-route__base" d="M 100 105 H 865 C 907 105 930 128 930 170 V 325 C 930 367 907 390 865 390 H 100" />
          <path class="process-route__fill" d="M 100 105 H 865 C 907 105 930 128 930 170 V 325 C 930 367 907 390 865 390 H 100" />
        </svg>
        <ol class="process-milestones">
          {#each process as item}
            <li class="process-step">
              <span class="process-marker">{item.step}</span>
              <div class="process-step__copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </section>

<section id="studio" class="section studio-section studio-work-section">
  <div class="wide-container studio-work-header">
    <div>
      <p class="eyebrow studio-work-eyebrow">A LOOK INSIDE MY CREATIVE PROCESS</p>
      <h2>On my desk lately.</h2>
    </div>
    <p class="studio-work-hint" aria-hidden="true">DRAG TO EXPLORE <span>→</span></p>
  </div>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="studio-work-scroll"
  bind:this={studioScroll}
  role="region"
  aria-roledescription="carousel"
  aria-label="On my desk lately projects; use left and right arrow keys to explore"
  tabindex="0"
  onkeydown={handleStudioKeydown}
  onpointerenter={showDragCursor}
  onpointerleave={hideDragCursor}
  onpointermove={dragScroll}
  onpointerdown={startDrag}
  onpointerup={stopDrag}
  onpointercancel={stopDrag}
>
    <div class="studio-work-track">
      {#each studioCards as item}
        <article class="studio-work-card">
          <enhanced:img
            src={item.image}
            alt={`${item.title} website project`}
            sizes="(max-width: 720px) 82vw, (max-width: 1050px) 360px, 400px"
            loading="lazy"
            decoding="async"
          />

          <div class="studio-work-overlay"></div>

          <div class="studio-work-content">
            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>

            <span>{item.status}</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
  {/if}

<section
  id="work"
  class="section work-section"
  onfocusin={() => {
    workFocused = true;
    stopWorkAutoplay();
  }}
  onfocusout={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      workFocused = false;
      startWorkAutoplay();
    }
  }}
>
  <div class="wide-container work-header">
    <div>
      <p class="eyebrow">{t.home.work.eyebrow}</p>
      <h2>{t.home.work.title}</h2>
      <p class="work-header__description">
        {t.home.work.description}
      </p>
    </div>
    <nav class="work-controls" aria-label={t.home.work.navAria}>
      <button type="button" aria-label={t.home.work.previous} onclick={() => navigateWork(-1)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m14 5-7 7 7 7" />
        </svg>
      </button>
      <button type="button" aria-label={t.home.work.next} onclick={() => navigateWork(1)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m10 5 7 7-7 7" />
        </svg>
      </button>
    </nav>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
  <div
    class="work-rail"
    bind:this={workRail}
    role="region"
    aria-roledescription="carousel"
    aria-label={t.home.work.railAria}
    tabindex="0"
    onkeydown={handleWorkKeydown}
    onwheel={(event) => {
      if (event.deltaX || event.shiftKey) stopWorkForUser();
    }}
    onpointerenter={(event) => {
      if (event.pointerType === 'mouse') {
        workHovered = true;
        stopWorkAutoplay();
      }
    }}
    onpointerleave={(event) => {
      endWorkDrag();
      if (event.pointerType === 'mouse') {
        workHovered = false;
        startWorkAutoplay();
      }
    }}
    onpointerdown={startWorkDrag}
    onpointermove={moveWorkDrag}
    onpointerup={endWorkDrag}
    onpointercancel={endWorkDrag}
    ondragstart={(event) => event.preventDefault()}
    onscroll={normalizeWorkScroll}
    onclickcapture={handleWorkClick}
    onclick={(event) => {
      if (event.target.closest('a')) stopWorkForUser();
    }}
  >
    <div class="work-track">
      {#each [...projects, ...projects, ...projects] as project, index}
        {@const isDuplicate = index < projects.length || index >= projects.length * 2}

        <article
          class="project-card"
          aria-hidden={isDuplicate ? 'true' : undefined}
          onmouseenter={playProjectSound}
        >
          <div class="project-image-wrap">
            <img
              src={project.image}
              alt={isDuplicate ? '' : t.home.work.imageAlt(project.title)}
              class="project-image"
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="project-content">
            <span>{project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.type}</p>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              tabindex={isDuplicate ? -1 : undefined}
              aria-label={
                isDuplicate
                  ? undefined
                  : t.home.work.visitAria(project.title)
              }
            >
              {t.home.work.visit}
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

  <section id="skills" class="home-skills" aria-labelledby="skills-title">
    <div class="wide-container home-skills__inner">
      <header class="home-skills__heading">
        <p class="home-kicker">{t.home.skills.kicker}</p>
        <h2 id="skills-title">{t.home.skills.title}</h2>
      </header>

      <div class="home-skills__groups">
        {#each skillGroups as group (group.id)}
          <div class="home-skills__group">
            <h3 id="skills-{group.id}" class="home-skills__label">{group.label}</h3>
            <ul class="home-skills__cells" aria-labelledby="skills-{group.id}">
              {#each group.items as item (item)}
                <li class="home-skills__cell"><span class="home-skills__cell-body">{item}</span></li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>

  {#if showClientSections}
 <section class="section testimonials-section">
  <div class="wide-container testimonials-header">
    <p class="eyebrow">Testimonials</p>

    <h2>
      Kind words from
      <span>past clients</span>
    </h2>
  </div>

  <div class="testimonials-wall">
    <div class="fade-top" aria-hidden="true"></div>
    <div class="fade-bottom" aria-hidden="true"></div>

    <div class="testimonial-columns">
      {#each testimonialColumns as column, columnIndex}
        <div class={`testimonial-column column-${columnIndex + 1}`}>
          {#each [...column, ...column] as item, index}
            {@const isDuplicate = index >= column.length}

            <article
              class="testimonial-card"
              aria-hidden={isDuplicate ? 'true' : undefined}
            >
              <p class="testimonial-quote">
                “{item.quote}”
              </p>

              <div
                class="testimonial-separator"
                aria-hidden="true"
              ></div>

              <div class="testimonial-person">
                <div class="testimonial-avatar">
                  <img
                    src={item.image}
                    alt={isDuplicate ? '' : item.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div class="testimonial-meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
  {/if}

<section id="about" class="about-studio" aria-labelledby="about-studio-title" bind:this={aboutSection}>
  <CellsBackground opacity={0.28} />
  <div class="about-studio__container">
    <div class="about-studio__content">
      <p class="about-studio__eyebrow">{t.home.about.eyebrow}</p>
      <h2 id="about-studio-title" class="about-studio__title">
        {t.home.about.title}
      </h2>
      <div class="about-studio__description">
        {#each t.home.about.paragraphs as paragraph (paragraph)}
          <p>
            {paragraph}
          </p>
        {/each}
      </div>
      <a class="about-studio__cta" href="#contact">{t.home.about.cta} <span aria-hidden="true">↗</span></a>
      <p class="about-studio__identity">
        <span>{t.home.about.identity[0]}</span>
        <span>{t.home.about.identity[1]}</span>
      </p>
    </div>
    <figure class="about-studio__visual">
      <img
        src="/images/about/patty-diaz-about-m.webp"
        alt={t.home.about.imageAlt}
        class="about-studio__image"
        width="800"
        height="800"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>
</section>

  {#if showClientSections}
 <section bind:this={manifestoSection} class="manifesto-section">
  <canvas bind:this={canvas} id="hero-webgl"></canvas>

  <div class="manifesto-content">
    <h2>
      Designed to connect
    </h2>

    <a
      href="/pricing"
      class="btn btn-primary manifesto-pricing-button"
    >
      View Pricing
    </a>
  </div>
</section>

<!-- ========================================
     Homepage — FAQ Section
========================================= -->

<section class="home-faq" id="faq" aria-labelledby="home-faq-title">
  <div class="home-faq__container">
    <header class="home-faq__intro">
      <p class="home-faq__eyebrow">Questions & answers</p>

      <h2 id="home-faq-title" class="home-faq__title">
        FAQ
      </h2>

      <p class="home-faq__subtitle">
        Have a question?
      </p>
    </header>

    <div class="home-faq__list">
      {#each faqs as faq (faq.question)}
        <details class="home-faq__item">
          <summary class="home-faq__question">
            <span>{faq.question}</span>

            <span class="home-faq__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <path d="M4.5 7.5 10 13l5.5-5.5" />
              </svg>
            </span>
          </summary>

          <div class="home-faq__answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      {/each}
    </div>
  </div>
</section>

 <section id="project-contact" class="final-cta" aria-labelledby="closing-title">
  <div class="wide-container cta-inner">
    <div class="cta-content">
      <h2 id="closing-title">Tell me about your project.</h2>

      <p>I’ll reply with a clear next step.</p>

      <div class="cta-actions">
        <a href="/get-started/" class="btn btn-primary">Get a free website review</a>
        <a
          href={t.whatsappHref}
          class="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp me
        </a>
      </div>
    </div>
  </div>
</section>
  {/if}

  <section id="contact" class="final-cta home-contact" aria-labelledby="contact-title">
    <div class="wide-container cta-inner">
      <div class="cta-content">
        <p class="eyebrow">{t.home.contact.eyebrow}</p>
        <h2 id="contact-title">{t.home.contact.title}</h2>

        <ul class="home-contact__links">
          <li>
            <span>{t.home.contact.email}</span>
            <a href={contactEmailHref}>{contactEmail}</a>
          </li>
          <li>
            <span>{t.home.contact.linkedin}</span>
            <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/patricia-d-ab25a61a6
            </a>
          </li>
          <li>
            <span>{t.home.contact.whatsapp}</span>
            <a href={t.whatsappHref} target="_blank" rel="noopener noreferrer">
              {t.home.contact.whatsappLink}
            </a>
          </li>
          <li>
            <span>{t.home.contact.upwork}</span>
            <a href={upworkHref} target="_blank" rel="noopener noreferrer">
              {t.home.contact.upworkLink}
            </a>
          </li>
        </ul>

        <div class="cta-actions">
          <a
            href="/Patricia-Diaz-CV.pdf"
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.home.contact.cv}
          </a>
        </div>
      </div>
    </div>
  </section>


  {#if dragCursorVisible}
  <div
    class:dragging={isDragging}
    class="drag-cursor"
    style={`left: ${dragCursorX}px; top: ${dragCursorY}px;`}
  >
    DRAG
  </div>
{/if}
</main>

<SiteFooter {t} />

