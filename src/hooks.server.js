import { dictionaries, langFromPath } from '$lib/i18n';

/**
 * Fills the %lang% placeholder in src/app.html: "es-AR" under /es/, "en"
 * everywhere else. Runs during prerendering, so the static HTML is correct.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  const lang = dictionaries[langFromPath(event.url.pathname)].htmlLang;
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
}
