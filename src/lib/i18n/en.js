import { whatsappHref } from '$lib/contact.js';

/**
 * English copy for the home page, the Work page, the header and the hero
 * carousel. es.js has the same keys. Client names live in the components and
 * are never translated.
 */
export default {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  whatsappHref,

  routes: {
    home: '/',
    work: '/work'
  },

  header: {
    homeAria: 'Kamburcito Studio home',
    mainNavAria: 'Main navigation',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    themeAria: 'Toggle light and dark mode',
    cta: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mobileNavAria: 'Mobile navigation',
    mobileHome: 'Home'
  },

  footer: {
    studio: 'Kamburcito Studio',
    tagline: 'Web Design & Digital Experiences',
    madeBy: 'Made by Patricia · 2026',
    contactAria: 'Contact links',
    emailAria: 'Email me',
    whatsappAria: 'Chat on WhatsApp',
    linkedin: 'LinkedIn'
  },

  carousel: {
    aria: 'Selected client websites and studio highlights',
    cards: {
      femsculpt: { label: 'Cosmetic gynecology' },
      'immigration-law-dfw': { label: 'Law firm' },
      'beccar-varela': { label: 'Law firm' },
      'shady-grove': { label: 'Healthcare' },
      'nc-builders': { label: 'Home builder' },
      websites: { title: '50+', label: 'websites delivered' },
      since: { title: 'Since 2019', label: 'founder-led studio' },
      lark: {},
      'spry-society': { label: 'Wellness' },
      surfaceworks: { label: 'Industrial services' },
      'plastic-surgery': { title: 'Plastic surgery practice', label: 'Past project' },
      'med-spa': { title: 'Med spa', label: 'Past project' }
    }
  },

  home: {
    meta: {
      url: 'https://kamburcito.com/',
      title: 'Patricia Diaz | Web Designer and Developer | Kamburcito Studio',
      description:
        'Web designer and developer in Buenos Aires building websites for healthcare and legal practices. WordPress, SvelteKit, SEO. Available for remote roles and contracts.',
      jobTitle: 'Web Designer and Developer'
    },

    hero: {
      eyebrow: 'Web designer and developer',
      title: 'Websites for healthcare and legal practices, built to earn trust.',
      subtitle:
        'I’m Patricia Diaz, a web designer and developer based in Buenos Aires. Since 2019 I’ve built 50+ websites with WordPress and SvelteKit, with SEO and HubSpot follow-up. I work in English and Spanish.',
      note: 'Available for remote roles and contracts.',
      workHref: '/work/',
      work: 'See my work',
      cv: 'Download CV',
      scrollAria: 'Scroll to selected work',
      scroll: 'Scroll'
    },

    work: {
      eyebrow: 'SELECTED WORK',
      title: 'Work that speaks for itself.',
      description: "A collection of websites I've designed, developed, and helped bring to life.",
      navAria: 'Selected work navigation',
      previous: 'Previous project',
      next: 'Next project',
      railAria: 'Selected work projects; use left and right arrow keys to explore',
      imageAlt: (title) => `${title} website project`,
      visitAria: (title) => `Visit ${title} website — opens in a new tab`,
      visit: 'Visit Website →',
      projects: {
        femsculpt: { type: 'Cosmetic gynecology', stack: 'WordPress' },
        'immigration-law-dfw': { type: 'Law firm', stack: 'WordPress' },
        'beccar-varela': { type: 'Law firm', stack: 'WordPress' },
        'nc-builders': { type: 'Construction company', stack: 'WordPress / Elementor' },
        'shady-grove': { type: 'Website support', stack: 'WordPress / Website Support' }
      }
    },

    skills: {
      kicker: 'Skills',
      title: 'What I work with.',
      groups: [
        { id: 'design', label: 'Design', items: ['Website design', 'UI and UX'] },
        {
          id: 'build',
          label: 'Build',
          items: [
            'WordPress',
            'Elementor',
            'WooCommerce',
            'SvelteKit',
            'Tailwind CSS',
            'Webflow',
            'Shopify',
            'Squarespace'
          ]
        },
        {
          id: 'growth',
          label: 'Growth',
          items: ['On-page SEO', 'Core Web Vitals', 'HubSpot automations', 'AI-assisted content']
        },
        { id: 'languages', label: 'Languages', items: ['English', 'Spanish'] }
      ]
    },

    about: {
      eyebrow: 'THE PERSON BEHIND KAMBURCITO',
      title: 'A little creativity. A lot of intention.',
      paragraphs: [
        'I’m a web designer and developer from Buenos Aires. Since 2019 I’ve built websites for law firms, medical practices and growing businesses, from first design to launch.',
        'Since December 2024 I’ve also supported Conduct Science with web design, product imagery, SEO and AI-assisted blog content. I’m currently studying Systems Analysis at IFTS 18, and I hold a Master’s in Digital Marketing.'
      ],
      cta: "Let's work together",
      identity: ['DESIGNER + DEVELOPER', 'BASED IN BUENOS AIRES · WORKING WORLDWIDE'],
      imageAlt: 'Patricia Diaz, web designer and developer in Buenos Aires'
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Open to remote roles and contracts.',
      email: 'Email',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
      whatsappLink: 'Chat on WhatsApp',
      upwork: 'Upwork',
      upworkLink: 'Find me on Upwork',
      cv: 'Download CV'
    }
  },

  work: {
    meta: {
      url: 'https://kamburcito.com/work/',
      title: 'Selected Work | Patricia Diaz, Web Designer and Developer',
      description:
        'Selected website projects for healthcare and legal practices, built with WordPress and SvelteKit by Patricia Diaz in Buenos Aires.'
    },

    hero: {
      title: 'Websites built for healthcare and legal practices.',
      subtitle:
        "A selection of projects from 50+ websites I've designed and built since 2019, with WordPress and SvelteKit. Each one is made to look credible, load fast and make the next step clear.",
      note: 'Available for remote roles and contracts.',
      explore: 'Explore my projects',
      cv: 'Download CV'
    },

    card: {
      eyebrow: 'Featured Project',
      role: 'Role',
      platform: 'Platform',
      visit: 'Visit Website →',
      live: 'View Live Site →'
    },

    moreTitle: 'More projects',

    projects: {
      femsculpt: {
        description:
          'Full website redesign for a cosmetic gynecology practice, with HubSpot follow-up automations.',
        role: 'Design · Development'
      },
      'immigration-law-dfw': {
        description:
          'Website design and build for an immigration law firm in the Dallas–Fort Worth area.',
        role: 'Design · Development'
      },
      'beccar-varela': {
        description: 'Website design and build for a corporate law firm.',
        role: 'Design · Development'
      },
      'nc-builders': {
        description:
          "Website redesign for a Nevada City builder, developed from the client's mockup and style guide on WordPress and Elementor, optimized for speed and Core Web Vitals.",
        role: 'Development · Performance Optimization'
      },
      'shady-grove': {
        description: 'Design updates and ongoing site support for a fertility practice.',
        role: 'Website Support · Design Updates'
      },
      'spry-society': {
        title: 'Wellness Brand Website',
        description:
          'A calming wellness website designed to feel trustworthy, clear, and approachable while guiding visitors toward services and next steps.',
        role: 'Design · Development'
      },
      'conduct-science': {
        description:
          'A scientific eCommerce website built with WordPress and WooCommerce, designed to support a large product catalog, clear navigation, and a stronger buying experience.',
        role: 'Design · Development · WooCommerce'
      },
      surfaceworks: {
        description:
          'An industrial services website with a cleaner structure, stronger positioning, and a more professional presentation for service-based leads.',
        role: 'Design · Development'
      },
      'takahiro-ogawa': {
        description:
          'A personal brand website with a strong editorial feel, designed to showcase creative work with a clean and memorable visual direction.',
        role: 'Design · Squarespace Build'
      },
      lark: {
        title: 'Digital Coaching',
        description:
          'A calm, conversion-focused Webflow website for a digital coaching brand, designed to build trust, explain its services clearly, and encourage potential clients to connect.',
        role: 'Design · Development'
      }
    },

    closing: {
      eyebrow: 'OPEN STUDIO',
      title: 'Let’s create a website that feels like your brand.',
      description:
        'Thoughtful design, smooth development, and a clear visual direction — built to help your business stand out and connect with the right people.',
      button: 'START A PROJECT'
    }
  }
};
