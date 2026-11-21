import { whatsappHrefEs } from '$lib/contact.js';

/**
 * Spanish (Argentina, "vos") copy. Same keys as en.js. Client names live in
 * the components and are never translated. Labels the English source writes
 * in capitals (rather than CSS) are written in capitals here too, so both
 * languages look the same.
 */
export default {
  lang: 'es',
  htmlLang: 'es-AR',
  ogLocale: 'es_AR',
  whatsappHref: whatsappHrefEs,

  routes: {
    home: '/es/',
    work: '/es/work'
  },

  header: {
    homeAria: 'Inicio de Kamburcito Studio',
    mainNavAria: 'Navegación principal',
    work: 'Trabajos',
    about: 'Sobre mí',
    contact: 'Contacto',
    themeAria: 'Cambiar entre modo claro y oscuro',
    cta: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mobileNavAria: 'Navegación móvil',
    mobileHome: 'Inicio'
  },

  footer: {
    studio: 'Kamburcito Studio',
    tagline: 'Diseño web y experiencias digitales',
    madeBy: 'Hecho por Patricia · 2026',
    contactAria: 'Enlaces de contacto',
    emailAria: 'Escribime un email',
    whatsappAria: 'Escribime por WhatsApp',
    linkedin: 'LinkedIn'
  },

  carousel: {
    aria: 'Sitios de clientes y datos destacados del estudio',
    cards: {
      femsculpt: { label: 'Ginecología estética' },
      'immigration-law-dfw': { label: 'Estudio jurídico' },
      'beccar-varela': { label: 'Estudio jurídico' },
      'shady-grove': { label: 'Salud' },
      'nc-builders': { label: 'Constructora' },
      websites: { title: '50+', label: 'Sitios entregados' },
      since: { title: 'Desde 2019', label: 'estudio dirigido por su fundadora' },
      lark: {},
      'spry-society': { label: 'Bienestar' },
      surfaceworks: { label: 'Servicios industriales' },
      'plastic-surgery': { title: 'Consultorio de cirugía plástica', label: 'Proyecto anterior' },
      'med-spa': { title: 'Spa médico', label: 'Proyecto anterior' }
    }
  },

  home: {
    meta: {
      url: 'https://kamburcito.com/es/',
      title: 'Patricia Díaz | Diseñadora y desarrolladora web | Kamburcito Studio',
      description:
        'Diseñadora y desarrolladora web en Buenos Aires que crea sitios para clínicas y estudios jurídicos. WordPress, SvelteKit, SEO. Disponible para trabajo remoto y proyectos.',
      jobTitle: 'Diseñadora y desarrolladora web'
    },

    hero: {
      eyebrow: 'Diseñadora y desarrolladora web',
      title: 'Sitios web para clínicas y estudios jurídicos, creados para generar confianza.',
      subtitle:
        'Soy Patricia Díaz, diseñadora y desarrolladora web en Buenos Aires. Desde 2019 construí más de 50 sitios con WordPress y SvelteKit, con SEO y seguimiento de contactos en HubSpot. Trabajo en inglés y en español.',
      note: 'Disponible para trabajo remoto y proyectos.',
      workHref: '/es/work/',
      work: 'Ver mis trabajos',
      cv: 'Descargar CV',
      scrollAria: 'Bajar a los trabajos seleccionados',
      scroll: 'Bajar'
    },

    work: {
      eyebrow: 'Trabajos seleccionados',
      title: 'Trabajos que hablan por sí mismos.',
      description: 'Una selección de sitios que diseñé, desarrollé y ayudé a lanzar.',
      navAria: 'Navegación de trabajos seleccionados',
      previous: 'Ver el proyecto anterior',
      next: 'Ver el proyecto siguiente',
      railAria: 'Trabajos seleccionados; usá las flechas izquierda y derecha para recorrerlos',
      imageAlt: (title) => `Sitio web de ${title}`,
      visitAria: (title) => `Visitar el sitio de ${title} (se abre en una pestaña nueva)`,
      visit: 'Visitar sitio →',
      projects: {
        femsculpt: { type: 'Ginecología estética', stack: 'WordPress' },
        'immigration-law-dfw': { type: 'Estudio jurídico', stack: 'WordPress' },
        'beccar-varela': { type: 'Estudio jurídico', stack: 'WordPress' },
        'nc-builders': { type: 'Constructora', stack: 'WordPress / Elementor' },
        'shady-grove': { type: 'Soporte web', stack: 'WordPress / Soporte web' }
      }
    },

    skills: {
      kicker: 'Habilidades',
      title: 'Con qué trabajo.',
      groups: [
        { id: 'design', label: 'Diseño', items: ['Diseño web', 'UI y UX'] },
        {
          id: 'build',
          label: 'Desarrollo',
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
          label: 'Crecimiento',
          items: [
            'SEO on-page',
            'Core Web Vitals',
            'Automatizaciones en HubSpot',
            'Contenido asistido con IA'
          ]
        },
        { id: 'languages', label: 'Idiomas', items: ['Inglés', 'Español'] }
      ]
    },

    about: {
      eyebrow: 'LA PERSONA DETRÁS DE KAMBURCITO',
      title: 'Un poco de creatividad. Mucha intención.',
      paragraphs: [
        'Soy diseñadora y desarrolladora web de Buenos Aires. Desde 2019 diseñé y construí más de 50 sitios para estudios jurídicos, consultorios médicos y negocios en crecimiento, desde el primer boceto hasta el lanzamiento.',
        'Me importan los detalles que hacen que un sitio transmita confianza: una estructura clara, carga rápida y formularios que realmente te llegan. Trabajo con WordPress y SvelteKit, y sumo SEO, contenido y seguimiento con HubSpot cuando el proyecto lo necesita. Tengo una Maestría en Marketing Digital, así que cada página que construyo tiene un objetivo claro. Trabajo en inglés y en español.'
      ],
      cta: 'Trabajemos juntos',
      identity: ['DISEÑADORA + DESARROLLADORA', 'CON BASE EN BUENOS AIRES · TRABAJO EN TODO EL MUNDO'],
      imageAlt: 'Patricia Díaz, diseñadora y desarrolladora web en Buenos Aires'
    },

    contact: {
      eyebrow: 'Contacto',
      title: 'Disponible para trabajo remoto y proyectos.',
      email: 'Email',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
      whatsappLink: 'Escribime por WhatsApp',
      upwork: 'Upwork',
      upworkLink: 'Encontrame en Upwork',
      cv: 'Descargar CV'
    }
  },

  work: {
    meta: {
      url: 'https://kamburcito.com/es/work/',
      title: 'Trabajos seleccionados | Patricia Díaz, diseñadora y desarrolladora web',
      description:
        'Proyectos de sitios web para clínicas y estudios jurídicos, creados con WordPress y SvelteKit por Patricia Díaz en Buenos Aires.'
    },

    hero: {
      title: 'Sitios web creados para clínicas y estudios jurídicos.',
      subtitle:
        'Una selección de proyectos entre los más de 50 sitios que diseñé y construí desde 2019, con WordPress y SvelteKit. Cada uno está pensado para generar confianza, cargar rápido y dejar claro el siguiente paso.',
      note: 'Disponible para trabajo remoto y proyectos.',
      explore: 'Explorar mis proyectos',
      cv: 'Descargar CV'
    },

    card: {
      eyebrow: 'Proyecto destacado',
      role: 'Rol',
      platform: 'Plataforma',
      visit: 'Visitar sitio →',
      live: 'Ver el sitio →'
    },

    moreTitle: 'Más proyectos',

    projects: {
      femsculpt: {
        description:
          'Rediseño completo del sitio de un consultorio de ginecología estética, con automatizaciones de seguimiento en HubSpot.',
        role: 'Diseño · Desarrollo'
      },
      'immigration-law-dfw': {
        description:
          'Diseño y desarrollo del sitio de un estudio de inmigración del área de Dallas–Fort Worth.',
        role: 'Diseño · Desarrollo'
      },
      'beccar-varela': {
        description: 'Diseño y desarrollo del sitio de un estudio jurídico corporativo.',
        role: 'Diseño · Desarrollo'
      },
      'nc-builders': {
        description:
          'Rediseño del sitio de una constructora de Nevada City, desarrollado a partir de la maqueta y la guía de estilo del cliente en WordPress y Elementor, optimizado para velocidad y Core Web Vitals.',
        role: 'Desarrollo · Optimización de rendimiento'
      },
      'shady-grove': {
        description:
          'Actualizaciones de diseño y soporte continuo del sitio de una clínica de fertilidad.',
        role: 'Soporte web · Actualizaciones de diseño'
      },
      'spry-society': {
        title: 'Sitio para una marca de bienestar',
        description:
          'Un sitio de bienestar sereno, pensado para transmitir confianza, claridad y cercanía mientras guía a cada visitante hacia los servicios y el siguiente paso.',
        role: 'Diseño · Desarrollo'
      },
      'conduct-science': {
        description:
          'Un eCommerce científico hecho con WordPress y WooCommerce, pensado para sostener un catálogo grande de productos, una navegación clara y una mejor experiencia de compra.',
        role: 'Diseño · Desarrollo · WooCommerce'
      },
      surfaceworks: {
        description:
          'Un sitio de servicios industriales con una estructura más clara, un posicionamiento más sólido y una presentación más profesional para atraer consultas.',
        role: 'Diseño · Desarrollo'
      },
      'takahiro-ogawa': {
        description:
          'Un sitio de marca personal con un fuerte tono editorial, pensado para mostrar trabajo creativo con una dirección visual limpia y memorable.',
        role: 'Diseño · Desarrollo en Squarespace'
      },
      lark: {
        title: 'Coaching digital',
        description:
          'Un sitio en Webflow sereno y orientado a la conversión para una marca de coaching digital, pensado para generar confianza, explicar sus servicios con claridad y animar a potenciales clientes a escribir.',
        role: 'Diseño · Desarrollo'
      }
    },

    closing: {
      eyebrow: 'ESTUDIO ABIERTO',
      title: 'Creemos un sitio que se sienta como tu marca.',
      description:
        'Diseño cuidado, desarrollo prolijo y una dirección visual clara, para que tu negocio se destaque y conecte con las personas indicadas.',
      button: 'Empezar un proyecto'
    }
  }
};
