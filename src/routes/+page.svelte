<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import TextureHoverImage from '$lib/components/TextureHoverImage.svelte';
  import '../styles/10-homepage.css';
  import '../styles/90-homepage-responsive.css';
  import conductScienceImage from '$lib/assets/projects/conductscience-homepage-projects.webp?enhanced&w=960;640;400';
  import sgfImage from '$lib/assets/projects/sgf-homepage-project.webp?enhanced&w=623;400';
  import crueltyFreeImage from '$lib/assets/projects/cruelty-free-homepage-projects.webp?enhanced&w=960;640;400';
  import surfaceWorksImage from '$lib/assets/projects/surfaceworks-homepage-project.webp?enhanced&w=623;400';
  import takahiroImage from '$lib/assets/projects/takahiro-artist-homepage-project.webp?enhanced&w=960;640;400';
  import larkImage from '$lib/assets/projects/lark-homepage-project.webp?enhanced&w=960;640;400';
  import ncBuildersImage from '$lib/assets/working_on/nc-builders-working-on-homepage.webp?enhanced&w=500;360';
  import financialAdvisorImage from '$lib/assets/working_on/financial-advisor-working-on-homepage.webp?enhanced&w=500;360';
  import casaNidoImage from '$lib/assets/working_on/casa-nido-working-on-homepage.webp?enhanced&w=736;500;360';
  import lumaStudioImage from '$lib/assets/working_on/luma-studio-working-on-homepage.webp?enhanced&w=500;360';
  import brunchBloomImage from '$lib/assets/working_on/brunch-and-bloom-working-on-homepage.webp?enhanced&w=500;360';
  import goldenDistrictImage from '$lib/assets/working_on/golden-district-partners-working-on-homepage.webp?enhanced&w=500;360';
  import beachBitesImage from '$lib/assets/working_on/beach-bites-club-working-on-homepage.webp?enhanced&w=500;360';
  import petraValdezImage from '$lib/assets/working_on/petra-valdez-working-on-homepage.webp?enhanced&w=500;360';
  let canvas;
  let manifestoSection;
  let aboutSection;

  const structuredData = {
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
      description:
        'Kamburcito Studio is a creative web design and development studio creating distinctive, responsive websites for small businesses and growing brands.',
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
      jobTitle: 'Web Designer and Developer',
      worksFor: {
        '@id': 'https://kamburcito.com/#business'
      },
      knowsAbout: [
        'Web Design',
        'Front-end Development',
        'WordPress',
        'SvelteKit',
        'Tailwind CSS',
        'Responsive Web Design',
        'Website Performance',
        'On-page SEO'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kamburcito.com/#website',
      url: 'https://kamburcito.com/',
      name: 'Kamburcito Studio',
      description:
        'Creative web design and development for small businesses and growing brands.',
      publisher: {
        '@id': 'https://kamburcito.com/#business'
      },
      inLanguage: ['en']
    },
    {
      '@type': 'WebPage',
      '@id': 'https://kamburcito.com/#webpage',
      url: 'https://kamburcito.com/',
      name: 'Creative Web Design & Development Studio | Kamburcito Studio',
      isPartOf: {
        '@id': 'https://kamburcito.com/#website'
      },
      about: {
        '@id': 'https://kamburcito.com/#business'
      },
      inLanguage: 'en'
    }
  ]
};
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
    title: 'NC Builders',
    subtitle: 'Construction Company',
    status: 'In production',
    image: ncBuildersImage
  },
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

 const services = [
  {
    number: '01',
    title: 'Web Design',
    text: 'Custom websites with strong layouts, clear structure, and a premium visual direction.',
    accent: 'cyan'
  },
  {
    number: '02',
    title: 'Product Design',
    text: 'Interface concepts, user flows, and digital experiences made to feel intuitive and polished.',
    accent: 'violet'
  },
  {
    number: '03',
    title: 'Branding',
    text: 'Visual direction, color systems, typography, and brand details that make your business memorable.',
    accent: 'pink'
  },
  {
    number: '04',
    title: 'Web Development',
    text: 'Responsive builds with clean code, smooth interactions, and client-friendly structure.',
    accent: 'gold'
  }
];

  const projects = [
    {
      title: 'Conduct Science',
      type: 'Scientific E-Commerce',
      stack: 'WordPress / WooCommerce',
      image: conductScienceImage,
      url: 'https://conductscience.com'
    },
    {
      title: 'Shady Grove Fertility',
      type: 'Healthcare Website',
      stack: 'WordPress / Custom Design',
      image: sgfImage,
      url: 'https://shadygrovefertility.com'
    },
    {
      title: 'Cruelty-Free Kitty',
      type: 'Editorial + Shop',
      stack: 'WordPress / Content Site',
      image: crueltyFreeImage,
      url: 'https://crueltyfreekitty.com'
    },
    {
      title: 'SurfaceWorks',
      type: 'Service Business',
      stack: 'WordPress / Redesign',
      image: surfaceWorksImage,
      url: 'https://surfaceworks.com'
    },
    {
      title: 'Takahiro Ogawa',
      type: 'Creative Portfolio',
      stack: 'Squarespace / Design',
      image: takahiroImage,
      url: 'https://takahiroogawa.com'
    },
    {
      title: 'Digital Coaching',
      type: 'Coaching Website',
      stack: 'Webflow/ Redesign & Dev',
      image: larkImage,
      url: 'https://www.lark.com/'
    }
  ];

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
  <title>
    Creative Web Design & Development Studio | Kamburcito Studio
  </title>

  <meta
    name="description"
    content="Kamburcito Studio designs and develops distinctive, responsive websites for small businesses and growing brands worldwide."
  />

  <link rel="canonical" href="https://kamburcito.com/" />

  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="Creative Web Design & Development Studio | Kamburcito Studio"
  />
  <meta
    property="og:description"
    content="Distinctive websites, thoughtful design, and modern development for small businesses and growing brands."
  />
  <meta property="og:url" content="https://kamburcito.com/" />
  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Creative Web Design & Development Studio | Kamburcito Studio"
  />
  <meta
    name="twitter:description"
    content="Distinctive websites, thoughtful design, and modern development for small businesses and growing brands."
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
        <p
          class="hero-cinematic__eyebrow"
        >
          Boutique Web Design Studio
        </p>

        <h1
          id="home-hero-title"
        >
          Websites designed with clarity, character and intention
        </h1>

        <h2
          class="hero-cinematic__subtitle"
        >
          Founder-led design and development for brands ready for a stronger
          digital presence
        </h2>

        <div
          class="hero-actions"
        >
          <a
            href="/work"
            class="btn btn-primary"
          >
            View My Work
          </a>
        </div>
      </div>
    </div>
    <div class="hero-cinematic__visual" aria-hidden="true">
      <TextureHoverImage src="/images/hero/kamburcito-hero-led-wall.webp" fit="cover" />
      <div class="hero-cinematic__overlay"></div>
    </div>
    <a
      href="#studio"
      class="hero-cinematic__scroll"
      aria-label="Scroll to current studio work"
    >
      <span>Scroll</span>
      <span aria-hidden="true">↓</span>
    </a>
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
      <p class="eyebrow">SELECTED WORK</p>
      <h2>Work that speaks for itself.</h2>
      <p class="work-header__description">
        A collection of websites I've designed, developed, and helped bring to life.
      </p>
    </div>
    <nav class="work-controls" aria-label="Selected work navigation">
      <button type="button" aria-label="Previous project" onclick={() => navigateWork(-1)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m14 5-7 7 7 7" />
        </svg>
      </button>
      <button type="button" aria-label="Next project" onclick={() => navigateWork(1)}>
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
    aria-label="Selected work projects; use left and right arrow keys to explore"
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
            <enhanced:img
              src={project.image}
              alt={isDuplicate ? '' : `${project.title} website project`}
              class="project-image"
              sizes="(max-width: 700px) 82vw, 520px"
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
                  : `Visit ${project.title} website — opens in a new tab`
              }
            >
              Visit Website →
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>


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

<section id="about" class="about-studio" aria-labelledby="about-studio-title" bind:this={aboutSection}>
  <div class="about-studio__container">
    <div class="about-studio__content">
      <p class="about-studio__eyebrow">THE PERSON BEHIND KAMBURCITO</p>
      <h2 id="about-studio-title" class="about-studio__title">
        A little creativity. A lot of intention.
      </h2>
      <div class="about-studio__description">
        <p>Hey, I'm Patricia — an independent web designer and developer based in Buenos Aires.</p>
        <p>I bring design, development, and thoughtful details together to create websites that look good, work beautifully, and feel true to the people behind them.</p>
      </div>
      <a class="about-studio__cta" href="/get-started">Let's work together <span aria-hidden="true">↗</span></a>
      <p class="about-studio__identity">
        <span>DESIGNER + DEVELOPER</span>
        <span>BASED IN BUENOS AIRES · WORKING WORLDWIDE</span>
      </p>
    </div>
    <figure class="about-studio__visual">
      <img
        src="/images/about/patricia-diaz-fermin-about-me-2026.webp"
        alt="Patricia Diaz, independent web designer and developer"
        class="about-studio__image"
        width="1024"
        height="1536"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>
</section>

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
      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>What’s your process, and how do revisions work?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            Every project moves through strategy, design, development, quality
            assurance, and launch. You receive clear milestones and focused
            feedback stages throughout the process. Revisions are included
            within the agreed scope, while larger changes can be handled as a
            separate scope update.
          </p>
        </div>
      </details>

      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>What should I budget for a custom website?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            Every website is quoted according to its size, design requirements,
            integrations, and functionality. You receive a clear fixed-price
            proposal before work begins, so you know exactly what is included.
            You can also review the
            <a href="/pricing">pricing page</a>
            for starting points and package examples.
          </p>
        </div>
      </details>

      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>What timeline should I expect?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            Most small-business websites take approximately two to six weeks,
            depending on the number of pages, content readiness, functionality,
            and feedback timeline. Your project schedule and milestones are
            confirmed before kickoff.
          </p>
        </div>
      </details>

      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>What makes Kamburcito Studio different?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            Kamburcito Studio is founder-led from beginning to end. You work
            directly with Patty throughout strategy, design, development, and
            launch—without being passed between departments. The result is a
            more personal process, clearer communication, and a website shaped
            around your actual business goals.
          </p>
        </div>
      </details>

      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>What platforms and technology do you use?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            The platform is selected around the needs of each project rather
            than following a single template. Kamburcito Studio works with
            WordPress, Elementor, SvelteKit, Shopify, Squarespace, and other
            modern tools depending on your content, editing, e-commerce, and
            performance requirements.
          </p>
        </div>
      </details>

      <details class="home-faq__item">
        <summary class="home-faq__question">
          <span>Can you redesign or improve an existing website?</span>

          <span class="home-faq__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M4.5 7.5 10 13l5.5-5.5" />
            </svg>
          </span>
        </summary>

        <div class="home-faq__answer">
          <p>
            Yes. Existing websites can be redesigned, reorganized, optimized
            for mobile, improved for performance, or migrated to a more suitable
            platform. The first step is reviewing what already works, what is
            limiting the site, and what should be preserved.
            <a href="/get-started">Start your project →</a>
          </p>
        </div>
      </details>
    </div>
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
        <a href="/get-started" class="btn btn-primary">Get a Quote</a>
        <a href="/work" class="btn btn-secondary">View Selected Work</a>
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

<footer class="footer">
  <div class="wide-container footer-inner">
    <p>Kamburcito Studio</p>
    <p>Web Design & Digital Experiences</p>
    <p>Made by Patricia · 2026</p>
  </div>
</footer>

