/** Contact links shared by the header, mobile menu and page CTAs. */
export const contactEmail = 'kamburcito@gmail.com';
export const contactEmailHref = `mailto:${contactEmail}`;

/** @param {string} message Pre-filled chat text. */
const whatsappLink = (message) =>
  'https://wa.me/5491138012415?text=' + encodeURIComponent(message);

export const whatsappHref = whatsappLink("Hi! I'd like to ask about a website.");
export const whatsappHrefEs = whatsappLink('¡Hola! Vi tu portfolio y me gustaría hablar.');

export const linkedinHref = 'https://www.linkedin.com/in/patricia-d-ab25a61a6/';

export const upworkHref = 'https://www.upwork.com/freelancers/~01fbbd53529e3ca33f';
