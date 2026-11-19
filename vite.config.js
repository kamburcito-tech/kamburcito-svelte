import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    enhancedImages(),
    tailwindcss(),

    sveltekit({
      appDir: 'app',
      compilerOptions: {
        // Force runes mode for project files.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules')
            ? undefined
            : true
            
      },

      adapter: adapter(),

      prerender: {
        // The CV PDF is supplied separately; until it is in static/, warn
        // instead of failing the build. Every other broken link still fails.
        handleHttpError: ({ path, message }) => {
          if (path === '/Patricia-Diaz-CV.pdf') {
            console.warn(`Missing static/Patricia-Diaz-CV.pdf (${message})`);
            return;
          }
          throw new Error(message);
        }
      }
    })
  ]
});