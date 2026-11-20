import en from './en.js';
import es from './es.js';

export const dictionaries = { en, es };

/**
 * Spanish lives under /es/; everything else is English.
 * @param {string} pathname
 * @returns {'en' | 'es'}
 */
export function langFromPath(pathname) {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}
