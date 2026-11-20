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

/** English paths that have a Spanish twin, and the twin. */
const SPANISH_TWINS = { '/': '/es/', '/work/': '/es/work/' };

/**
 * The equivalent page in the other language. English pages without a Spanish
 * version (pricing, get-started, …) switch to the Spanish home page.
 * @param {string} pathname
 * @param {'en' | 'es'} target
 */
export function switchPath(pathname, target) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (target === 'es') return SPANISH_TWINS[path] ?? '/es/';
  const english = Object.keys(SPANISH_TWINS).find((key) => SPANISH_TWINS[key] === path);
  return english ?? '/';
}
