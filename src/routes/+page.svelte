<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import LiquidMetal from '$lib/components/LiquidMetal.svelte';
  import TextureHoverImage from '$lib/components/TextureHoverImage.svelte';

  

let canvas;
let manifestoSection;
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
    studioScroll.scrollBy({ left: 320, behavior: 'smooth' });
  }

  if (event.key === 'ArrowLeft') {
    studioScroll.scrollBy({ left: -320, behavior: 'smooth' });
  }
}

  const studioCards = [
  {
    title: 'NC Builders',
    subtitle: 'Construction Company',
    status: 'In progress',
    image: '/images/working-on-construction-company-kamburcito.webp'
  },
   {
    title: 'Petra Valdez',
    subtitle: 'Jewelry & Accesories Store',
    status: 'In Development',
    image: '/images/petra-valdez-web-store-kamburcito-studio.webp'
  },
  {
    title: 'Casa Nido',
    subtitle: 'Real State Agency',
    status: 'In progress',
    image: '/images/casa-nido-workingon-kamburcito-studio.webp'
  },
  {
    title: 'Luma Studio',
    subtitle: 'Home Decor Store',
    status: 'In progress',
    image: '/images/luma-studio-working-on-kamburcito.webp'
  },
  {
    title: 'Financial Consultant Website',
    subtitle: 'Financial Advisor ',
    status: 'In progress',
    image: '/images/financial-advisor-working-on-kamburcito.webp'
  },
  {
    title: 'Brunch & Bloom',
    subtitle: 'Cafe & Brunch Spot',
    status: 'In progress',
    image: '/images/coffe-working-on-kamburcito.webp'
  },
  {
    title: 'Golden District Partners',
    subtitle: 'B2B Consulting Firm',
    status: 'In progress',
    image: '/images/golden-district-working-on-kamburcito.webp'
  },
  {
    title: 'Beach Bites Club',
    subtitle: 'Beach Bar & Restaurant',
    status: 'In progress',
    image: '/images/beach-bites-club-working-on-kamburcito.webp'
  }
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
      image: '/images/conductscience-homepage-project.webp',
      url: 'https://conductscience.com'
    },
    {
      title: 'Shady Grove Fertility',
      type: 'Healthcare Website',
      stack: 'WordPress / Custom Design',
      image: '/images/Shady-grove-fertility-homepage-project.webp',
      url: 'https://shadygrovefertility.com'
    },
    {
      title: 'Free Bunni',
      type: 'Beauty & Wellness',
      stack: 'WordPress / E-Commerce',
      image: '/images/free-bunni-homepage-project.webp',
      url: 'https://freebunni.com'
    },
    {
      title: 'Cruelty-Free Kitty',
      type: 'Editorial + Shop',
      stack: 'WordPress / Content Site',
      image: '/images/cruelty-free-homepage-project.webp',
      url: 'https://crueltyfreekitty.com'
    },
    {
      title: 'SurfaceWorks',
      type: 'Service Business',
      stack: 'WordPress / Redesign',
      image: '/images/surfaceworks-homepage-project-kamburcito.png',
      url: 'https://surfaceworks.com'
    },
    {
      title: 'Takahiro Ogawa',
      type: 'Creative Portfolio',
      stack: 'Squarespace / Design',
      image: '/images/takahiro-ogawa-homepage-project.webp',
      url: 'https://takahiroogawa.com'
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
     image: '/images/Maya-testimonial-kamburcito-studio.webp',
    quote:
      'Patricia made the whole website process feel easy. I came in with a messy idea, and she turned it into a polished site that feels calm, professional, and totally aligned with my brand.'
  },
  {
    name: 'Daniel Rivera',
    role: 'Creative Director, Rivera Studio',
    image: '/images/daniel-testimonial-kamburcito-studio.webp',
    quote:
      'My portfolio finally looks like the level of work I actually do. The design feels modern, confident, and memorable without being overcomplicated.'
  },
  {
    name: 'Aisha Bennett',
    role: 'Owner, Kind Roots Café',
    image: '/images/aisha-testimonial-kamburcito-studio.webp',
    quote:
      'I needed a website that felt warm and easy to use. Kamburcito Studio gave me something beautiful, clear, and ready to share with customers.'
  },
  {
    name: 'Lucas Morgan',
    role: 'Real Estate Consultant',
    image: '/images/lucas-testimonial-kamburcito-studio.webp',
    quote:
      'The site feels more premium than I expected. It helped me present my services clearly and gave my business a much stronger first impression.'
  },
  {
    name: 'Sofia Herrera',
    role: 'Founder, Casa Nido Realty',
    image: '/images/sofia-testimonial-kamburcito-studio.webp',
    quote:
      'Patricia understood the feeling I wanted right away. The website feels editorial, trustworthy, and elegant — exactly what I needed for my brand.'
  },
  {
    name: 'Ethan Brooks',
    role: 'Business Coach',
    image: '/images/ethan-testimonial-kamburcito-studio.webp',
    quote:
      'I finally have a website that explains what I do without overwhelming people. The structure, copy flow, and design all feel intentional.'
  },
  {
    name: 'Nadia Rahman',
    role: 'Jewelry Designer, Noura Atelier',
    image: '/images/nadia-testimonial-kamburcito-studio.webp',
    quote:
      'The visual direction was stunning. My products feel more elevated online now, and the whole site feels like a real brand experience.'
  },
  {
    name: 'Mateo Collins',
    role: 'Founder, Northline Builders',
    image: '/images/mateo-testimonial-kamburcito-studio.webp',
    quote:
      'Our old website felt outdated and forgettable. The new direction feels sharp, trustworthy, and much more aligned with the kind of clients we want.'
  },
  {
    name: 'Isabella Chen',
    role: 'Marketing Consultant',
    image: '/images/isabella-testimonial-kamburcito-studio.webp',
    quote:
      'Kamburcito Studio brought clarity to everything. The final site feels strategic, polished, and easy for potential clients to understand.'
  },
  {
    name: 'Julian Carter',
    role: 'Photographer',
    image: '/images/julian-testimonial-kamburcito-studio.webp',
    quote:
      'I wanted a portfolio that didn’t feel generic. Patricia created something clean, bold, and visual without distracting from my work.'
  },
  {
    name: 'Amara Lewis',
    role: 'Founder, The Soft Space',
    image: '/images/amara-testimonial-kamburcito-studio.webp',
    quote:
      'The website feels exactly like my brand: soft, modern, and professional. I felt supported through the whole process.'
  },
  {
    name: 'Noah Bennett',
    role: 'SaaS Founder',
    image: '/images/noah-testimonial-kamburcito-studio.webp',
    quote:
      'The landing page helped us explain our product much more clearly. It looks polished, loads fast, and feels more credible.'
  },
  {
    name: 'Camila Torres',
    role: 'Beauty Brand Founder',
    image: '/images/camila-testimonial-kamburcito-studio.webp',
    quote:
      'I loved how thoughtful the design process was. The final website feels elevated, feminine, and easy to shop.'
  },
  {
    name: 'Owen Mitchell',
    role: 'Founder, Golden District Partners',
    image: '/images/owen-testimonial-kamburcito-studio.webp',
    quote:
      'The site gave our consulting brand the credibility it was missing. It feels professional without feeling cold or corporate.'
  },
  {
    name: 'Leila Martins',
    role: 'Interior Designer',
    image: '/images/leila-testimonial-kamburcito-studio.webp',
    quote:
      'My website finally feels like my design style. It is elegant, spacious, and easy for clients to browse.'
  },
  ];
 const testimonialColumns = [[], [], []];

  testimonials.forEach((testimonial, index) => {
    testimonialColumns[index % 3].push(testimonial);
  });
  
  function playMagicSound() {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    audioContext = audioContext || new AudioContextClass();

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const now = audioContext.currentTime;
    const notes = [660, 990, 1320];

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const startTime = now + index * 0.035;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.035, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.24);
    });
  }

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
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
  varying vec2 vUv;

  float noise(vec2 p) {
    return sin(p.x * 18.0 + uTime) * sin(p.y * 14.0 + uTime * 0.8);
  }

  void main() {
    vec2 uv = vUv;

    // slow cinematic drift
    uv.x += sin(uv.y * 8.0 + uTime * 0.45) * 0.018;
    uv.y += cos(uv.x * 6.0 + uTime * 0.35) * 0.014;

    // liquid distortion
    float n = noise(uv * 2.0);
    uv += n * 0.022;

    // mouse ripple
    float mouseDist = distance(uv, uMouse);
    float ripple = smoothstep(0.45, 0.0, mouseDist);

    if (mouseDist > 0.001) {
      uv += normalize(uv - uMouse) * 0.035 * ripple;
    }

    // subtle RGB split so movement is visible
    vec2 rgbOffset = vec2(0.006 * ripple, 0.003 * ripple);

    float r = texture2D(uTexture, uv + rgbOffset).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - rgbOffset).b;

    vec4 color = vec4(r, g, b, 1.0);

    // breathing glow
    color.rgb *= 1.0 + sin(uTime * 0.8) * 0.06;

    // vignette
    float vignette = smoothstep(0.95, 0.22, distance(vUv, vec2(0.5)));
    color.rgb *= vignette;

    gl_FragColor = color;
  }
`
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('/images/manifesto-background-dark-space.jpg', () => {
      renderer.render(scene, camera);
    });

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    material.uniforms.uTexture.value = texture;

    const resize = () => {
      const width = manifestoSection.clientWidth;
      const height = manifestoSection.clientHeight;

      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const handleManifestoMouseMove = (event) => {
      const rect = manifestoSection.getBoundingClientRect();

      material.uniforms.uMouse.value.x = (event.clientX - rect.left) / rect.width;
      material.uniforms.uMouse.value.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    let animationFrame;

    const animate = () => {
      if (!prefersReducedMotion) {
        material.uniforms.uTime.value += 0.018;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    manifestoSection.addEventListener('mousemove', handleManifestoMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      manifestoSection.removeEventListener('mousemove', handleManifestoMouseMove);

      cancelAnimationFrame(animationFrame);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>Kamburcito Studio | Web Design & Digital Experiences</title>
  <meta
    name="description"
    content="Kamburcito Studio designs and builds modern websites, digital experiences, and creative online identities for brands and small businesses."
  />
</svelte:head>

<div class="liquid-cursor"></div>

<main>
  <section class="hero hero-split">
  <div class="hero-left">
    <div class="hero-content">
      <div class="hero-label">
        <span></span>
        <p>Web Design / Digital Experiences / Creative Development</p>
      </div>

      <h1>
        We design and develop 
        <span>really good websites.</span>
      </h1>

      <p class="hero-text">
        Designed from scratch. Built with intention.
      </p>

      <div class="hero-actions">
        <a href="/work" class="btn btn-primary">Explore Work</a>
        <a href="/get-started" class="btn btn-secondary">Start a Project</a>
      </div>

      <div class="hero-meta">
        <p>Based in Argentina</p>
        <p>Serving clients worldwide</p>
        <p>English & Spanish</p>
      </div>
    </div>
  </div>

 <div class="hero-right">
  <TextureHoverImage src="/images/kamburcito-hero-2-js.webp" fit="cover" />
</div>
</section>
<section id="studio" class="section studio-section studio-work-section">
  <div class="wide-container studio-work-header">
    <div>
      <h2>Working on</h2>
    </div>
  </div>

<div
  class="studio-work-scroll"
  bind:this={studioScroll}
  role="button"
  aria-label="Drag to scroll studio work carousel"
  tabindex="0"
  onmouseenter={showDragCursor}
  onmouseleave={hideDragCursor}
  onmousemove={dragScroll}
  onmousedown={startDrag}
  onmouseup={stopDrag}
>
  <div class="studio-work-track">
    {#each studioCards as item}
      <article class="studio-work-card">
        <img src={item.image} alt={item.title} />

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
                Selected websites.
           <span>Built to feel memorable.</span>
      </h2>
    </div>

    <p>
      A small collection of websites, redesigns, online stores, and creative builds
      crafted for real businesses.
    </p>
  </div>

  <div class="work-rail">
    <div class="work-track">
      {#each [...projects, ...projects] as project}
        <article class="project-card" onmouseenter={playProjectSound}>
          <div class="project-image-wrap">
            <img src={project.image} alt={project.title} class="project-image" />
          </div>

          <div class="project-content">
           <span>{project.stack}</span>
           <h3>{project.title}</h3>
           <p>{project.type}</p>

           <a
              href={project.url}
             target="_blank"
             rel="noopener noreferrer"
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
        <h2>How we work.</h2>

        <p class="process-intro">
          Every project is custom. I don’t hand over generic templates - I shape each step
          around your goals, your users, and your brand.
        </p>
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
      <span>past clients.</span>
    </h2>

    <p>
      Notes from brands and businesses I’ve helped through design, development,
      redesigns, and ongoing website support.
    </p>
  </div>

 <div class="testimonials-wall">
  <div class="fade-top"></div>
  <div class="fade-bottom"></div>
  <div class="testimonial-columns">
    {#each testimonialColumns as column, columnIndex}
      <div class={`testimonial-column column-${columnIndex + 1}`}>
        {#each [...column, ...column] as item}
          <article class="testimonial-card">
            <p class="testimonial-quote">“{item.quote}”</p>

            <div class="testimonial-separator"></div>

            <div class="testimonial-person">
              <div class="testimonial-avatar">
                <img src={item.image} alt={item.name} />
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

 <section bind:this={manifestoSection} class="manifesto-section">
  <canvas bind:this={canvas} id="hero-webgl"></canvas>

  <div class="manifesto-content">
    <h2>
      Your website should do more than look good. It should help people choose you.
    </h2>

    <a
      href="/pricing"
      class="btn btn-secondary manifesto-pricing-button"
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
        <a href="/get-started" class="btn btn-secondary">Get a Quote</a>
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

