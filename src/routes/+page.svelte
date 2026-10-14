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
  import aboutImage from '$lib/assets/about/patricia-diaz-kamburcito-web-developer-about.webp?enhanced&w=500;360';
  let canvas;
  let manifestoSection;
  let heroSection;
  let heroIntro;
  let heroWindow;
  let heroContent;
  let heroBackground;
  let heroDarkness;

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
        url: 'https://kamburcito.com/images/kamburcito-logo.webp'
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
  if (!studioScroll) return;

  isDragging = true;
  startX = event.pageX - studioScroll.offsetLeft;
  scrollLeft = studioScroll.scrollLeft;
}

function stopDrag() {
  isDragging = false;
}

function dragScroll(event) {
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
    subtitle: 'Real State Agency',
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

 const process = [
  {
    step: '01',
    title: 'Discover',
    text: 'We define your goals, audience, style direction, and what your website needs to communicate.',
    meta: 'Strategy / Structure / Direction',
    icon: 'compass'
  },
  {
    step: '02',
    title: 'Design',
    text: 'I create a polished visual direction with clear sections, strong layout, and a memorable brand feel.',
    meta: 'UI Design / Branding / Experience',
    icon: 'spark'
  },
  {
    step: '03',
    title: 'Build',
    text: 'The design becomes a responsive website with clean structure, smooth interactions, and launch-ready pages.',
    meta: 'Development / QA / Launch',
    icon: 'code'
  }
];

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
  if (
    !heroSection ||
    !heroIntro ||
    !heroWindow ||
    !heroContent ||
    !heroBackground ||
    !heroDarkness
  ) {
    return;
  }

  const heroPrefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const introWords = heroIntro.querySelectorAll('.hero-intro-word');
  const contentItems = heroContent.querySelectorAll('[data-hero-reveal]');

  /* =====================================================
     REDUCED MOTION
  ===================================================== */

  if (heroPrefersReducedMotion) {
    heroIntro.style.display = 'none';
    heroDarkness.style.display = 'none';

    heroBackground.style.opacity = '1';
    heroBackground.style.visibility = 'visible';

    heroContent.style.opacity = '1';
    heroContent.style.visibility = 'visible';

    contentItems.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });

    return;
  }

  /* =====================================================
     INITIAL STATES
  ===================================================== */

  introWords.forEach((word) => {
    word.style.opacity = '1';
    word.style.transform = 'none';
  });

  contentItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(28px)';
  });

  heroContent.style.visibility = 'visible';

  heroBackground.style.opacity = '0';
  heroBackground.style.visibility = 'visible';

  const animations = [];

  /* =====================================================
     1. OPEN NARROW APERTURE
  ===================================================== */

  animations.push(
    heroWindow.animate(
      [
        {
          width: '0vw',
          height: '42svh',
          borderRadius: '999px'
        },
        {
          width: '10vw',
          height: '42svh',
          borderRadius: '999px'
        }
      ],
      {
        duration: 300,
        delay: 40,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards'
      }
    )
  );

  /* =====================================================
     2. EXPAND APERTURE TO FULL SCREEN
  ===================================================== */

  animations.push(
    heroWindow.animate(
      [
        {
          width: '10vw',
          height: '42svh',
          borderRadius: '999px'
        },
        {
          width: '25vw',
          height: '64svh',
          borderRadius: '160px'
        },
        {
          width: '150vw',
          height: '130svh',
          borderRadius: '0px'
        }
      ],
      {
        duration: 600,
        delay: 320,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards'
      }
    )
  );

  /* =====================================================
     3. REVEAL FINAL BACKGROUND
  ===================================================== */

  animations.push(
    heroBackground.animate(
      [
        {
          opacity: 0
        },
        {
          opacity: 0,
          offset: 0.2
        },
        {
          opacity: 1
        }
      ],
      {
        duration: 480,
        delay: 520,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    )
  );

  /* =====================================================
     4. REMOVE INTRO DARKNESS
  ===================================================== */

  animations.push(
    heroDarkness.animate(
      [
        {
          opacity: 1
        },
        {
          opacity: 1,
          offset: 0.15
        },
        {
          opacity: 0
        }
      ],
      {
        duration: 460,
        delay: 560,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    )
  );

  /* =====================================================
     5. MOVE KAMBURCITO / STUDIO WORDS
  ===================================================== */

  introWords.forEach((word, index) => {
    const direction = index === 0 ? '-34vw' : '34vw';

    animations.push(
      word.animate(
        [
          {
            opacity: 1,
            transform: 'translateX(0)'
          },
          {
            opacity: 1,
            transform: `translateX(${direction})`,
            offset: 0.62
          },
          {
            opacity: 0,
            transform: `translateX(${direction})`
          }
        ],
        {
          duration: 650,
          delay: 340,
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          fill: 'forwards'
        }
      )
    );
  });

  /* =====================================================
     6. REMOVE COMPLETE INTRO OVERLAY
  ===================================================== */

  animations.push(
    heroIntro.animate(
      [
        {
          opacity: 1
        },
        {
          opacity: 1,
          offset: 0.65
        },
        {
          opacity: 0
        }
      ],
      {
        duration: 680,
        delay: 580,
        easing: 'linear',
        fill: 'forwards'
      }
    )
  );

  /* =====================================================
     7. REVEAL FINAL HERO CONTENT
  ===================================================== */

  contentItems.forEach((item, index) => {
    animations.push(
      item.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(24px)'
          },
          {
            opacity: 1,
            transform: 'translateY(0)'
          }
        ],
        {
          duration: 420,
          delay: 780 + index * 50,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      )
    );
  });

  /* =====================================================
     CLEANUP
  ===================================================== */

  return () => {
    animations.forEach((animation) => animation.cancel());
  };
});

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

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: null },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1, 1) }
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
          uv.y = (uv.y - 0.5) * scale + 0.5;
        } else {
          float scale = canvasAspect / imageAspect;
          uv.x = (uv.x - 0.5) * scale + 0.5;
        }

        /* -----------------------------------------
           Slow cinematic drift — softer than before
        ------------------------------------------ */
        uv.x += sin(uv.y * 8.0 + uTime * 0.45) * 0.010;
        uv.y += cos(uv.x * 6.0 + uTime * 0.35) * 0.008;

        /* -----------------------------------------
           Liquid distortion — reduced
        ------------------------------------------ */
        float n = noise(uv * 2.0);
        uv += n * 0.010;

        /* -----------------------------------------
           Mouse ripple — reduced
        ------------------------------------------ */
        float mouseDist = distance(baseUv, uMouse);
        float ripple = smoothstep(0.42, 0.0, mouseDist);

        if (mouseDist > 0.001) {
          uv += normalize(baseUv - uMouse) * 0.018 * ripple;
        }

        /* -----------------------------------------
           Subtle RGB split
        ------------------------------------------ */
        vec2 rgbOffset = vec2(0.003 * ripple, 0.0015 * ripple);

        float r = texture2D(uTexture, uv + rgbOffset).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv - rgbOffset).b;

        vec4 color = vec4(r, g, b, 1.0);

        /* -----------------------------------------
           Very subtle breathing glow
        ------------------------------------------ */
        color.rgb *= 1.0 + sin(uTime * 0.8) * 0.03;

        /* -----------------------------------------
           Softer vignette so the desk shows more
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

const manifestoMotionQuery = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

let manifestoPrefersReducedMotion = manifestoMotionQuery.matches;

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
  '/images/kamburcito-manifesto-background.webp',

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
  if (prefersReducedMotion) return;

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
  <section
    class="hero-cinematic"
    bind:this={heroSection}
    aria-labelledby="home-hero-title"
  >
    <!-- Intro darkness -->
    <div
      class="hero-intro-darkness"
      bind:this={heroDarkness}
      aria-hidden="true"
    ></div>

    <!-- Final interactive hero background -->
    <div
      class="hero-cinematic__background"
      bind:this={heroBackground}
      aria-hidden="true"
    >
      <div class="hero-cinematic__image">
        <TextureHoverImage
          src="/images/hero/kamburcito-hero-desktop.webp"
          fit="contain"
        />
      </div>

      <div
        class="hero-cinematic__overlay"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Intro animation -->
    <div
      class="hero-intro"
      bind:this={heroIntro}
      aria-hidden="true"
    >
      <div class="hero-intro-mask">
        <span class="hero-intro-word hero-intro-word--left">
          kamburcito
        </span>
      </div>

      <div
        class="hero-intro-window"
        bind:this={heroWindow}
      >
        <div class="hero-intro-window__image">
          <img
            src="/images/hero/kamburcito-hero-desktop.webp"
            alt=""
            class="hero-intro-static-image"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div
          class="hero-intro-window__overlay"
          aria-hidden="true"
        ></div>
      </div>

      <div class="hero-intro-mask">
        <span class="hero-intro-word hero-intro-word--right">
          studio
        </span>
      </div>
    </div>

    <!-- Final hero content -->
    <div
      class="hero-cinematic__content"
      bind:this={heroContent}
    >
      <div class="hero-cinematic__inner wide-container">
        <p
          class="hero-cinematic__eyebrow"
          data-hero-reveal
        >
          Boutique Web Design Studio
        </p>

        <h1
          id="home-hero-title"
          data-hero-reveal
        >
          Websites designed with clarity, character and intention
        </h1>

        <h2
          class="hero-cinematic__subtitle"
          data-hero-reveal
        >
          Founder-led design and development for brands ready for a stronger
          digital presence
        </h2>

        <div
          class="hero-actions"
          data-hero-reveal
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
  <a
    href="#studio"
    class="hero-cinematic__scroll"
    aria-label="Scroll to current studio work"
    data-hero-reveal
  >
    <span>Scroll</span>
    <span aria-hidden="true">↓</span>
  </a>
</section>
<section id="studio" class="section studio-section studio-work-section">
  <div class="wide-container studio-work-header">
    <div>
      <h2>Currently working on</h2>
    </div>
  </div>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="studio-work-scroll"
  bind:this={studioScroll}
  role="region"
  aria-roledescription="carousel"
  aria-label="Currently working on projects"
  tabindex="0"
  onkeydown={handleStudioKeydown}
  onmouseenter={showDragCursor}
  onmouseleave={hideDragCursor}
  onmousemove={dragScroll}
  onmousedown={startDrag}
  onmouseup={stopDrag}
>
    <div class="studio-work-track">
      {#each studioCards as item}
        <article class="studio-work-card">
          <enhanced:img
            src={item.image}
            alt={`${item.title} website project`}
            sizes="(max-width: 720px) 82vw, 520px"
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
  
<section id="work" class="section work-section">
  <div class="wide-container work-header">
    <div>
      <p class="eyebrow">Selected Work</p>

      <h2>
        Selected websites
        <span>Redesigns, online stores, and creative builds</span>
      </h2>
    </div>
  </div>

  <div class="work-rail">
    <div class="work-track">
      {#each [...projects, ...projects] as project, index}
        {@const isDuplicate = index >= projects.length}

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

  <section class="section process-section">
    <div class="wide-container">
      <div class="section-heading center process-heading">
        <p class="eyebrow">Process</p>
        <h2>Simple steps</h2>
      </div>

      <div class="process-flow">
        {#each process as item, index}
          <article class="process-card liquid-hover">
            <div class="process-card-top">
              <div class="process-icon">
  {#if item.icon === 'compass'}
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z" />
      <path d="m15.5 8.5-2.1 5-4.9 2 2.1-5 4.9-2Z" />
    </svg>
  {:else if item.icon === 'spark'}
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3Z" />
      <path d="M18.5 15.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" />
    </svg>
  {:else if item.icon === 'code'}
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </svg>
  {/if}
</div>
</div>

            <div class="process-card-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small>{item.meta}</small>
            </div>
          </article>

          {#if index < process.length - 1}
            <div class="process-arrow">→</div>
          {/if}
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

<section
  id="about"
  class="about-studio"
  aria-labelledby="about-studio-title"
>
  <div class="about-studio__container">
    <div class="about-studio__content">
      <p class="about-studio__eyebrow">About</p>

      <h2 id="about-studio-title" class="about-studio__title">
        Kamburcito Studio is a boutique website studio founded by Patricia Diaz
      </h2>

      <div class="about-studio__description">
        <p>
           I work directly with clients from strategy through launch, keeping
           branding, design, and development closely aligned throughout the project.
        </p>

        <p>
          The focus is simple: create distinctive, high-performing websites that
          build trust, communicate clearly, and help businesses grow with confidence.
        </p>
      </div>

      <dl class="about-studio__stats" aria-label="Kamburcito Studio experience">
        <div class="about-studio__stat">
          <dt>6+ years</dt>
          <dd>Founder-led experience</dd>
        </div>

        <div class="about-studio__stat">
          <dt>50+ launches</dt>
          <dd>Websites delivered</dd>
        </div>

        <div class="about-studio__stat">
          <dt>100%</dt>
          <dd>Direct collaboration</dd>
        </div>
      </dl>
    </div>

    <figure class="about-studio__visual">
  <picture>
    <enhanced:img
  src={aboutImage}
  alt="Patricia Diaz, founder of Kamburcito Studio"
  class="about-studio__image"
  sizes="(max-width: 900px) 92vw, 630px"
  loading="lazy"
  decoding="async"
/>
  </picture>
</figure>
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

