import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const SPA_ROUTES = [
  'submit-paper',
  'guidelines',
  'registration',
  'registration-fees',
  'conference-committee',
  'national-committee',
  'international-committee',
]

const ROUTE_METADATA = {
  'submit-paper': {
    title: 'IEEE COGNIA 2027 | Paper Submission',
    description: 'Paper submission information for IEEE COGNIA 2027.',
  },
  guidelines: {
    title: 'IEEE COGNIA 2027 | Paper Submission Guidelines',
    description: 'Paper submission guidelines and important dates for IEEE COGNIA 2027.',
  },
  registration: {
    title: 'IEEE COGNIA 2027 | Registration Details',
    description: 'Registration details and fees for IEEE COGNIA 2027.',
  },
  'registration-fees': {
    title: 'IEEE COGNIA 2027 | Registration Fees',
    description: 'Registration fee structure for IEEE COGNIA 2027.',
  },
  'conference-committee': {
    title: 'IEEE COGNIA 2027 | Conference Organisers',
    description: 'Meet the conference organisers for IEEE COGNIA 2027.',
  },
  'national-committee': {
    title: 'IEEE COGNIA 2027 | National Advisors',
    description: 'Meet the national advisors for IEEE COGNIA 2027.',
  },
  'international-committee': {
    title: 'IEEE COGNIA 2027 | International Advisors',
    description: 'Meet the international advisors for IEEE COGNIA 2027.',
  },
}

function withRouteMetadata(indexHtml, route) {
  const { title, description } = ROUTE_METADATA[route]
  const canonicalUrl = `https://cognia.uem.edu.in/${route}`

  return indexHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`)
}

// GitHub Pages is a static host and does not rewrite unknown paths to index.html.
// Emit one copy of the app shell per supported client-side route so direct loads
// and refreshes resolve before the History API router takes over.
function githubPagesRouteFallbacks() {
  let outputDirectory

  return {
    name: 'github-pages-route-fallbacks',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const indexHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')

      for (const route of SPA_ROUTES) {
        const routeDirectory = resolve(outputDirectory, route)
        await mkdir(routeDirectory, { recursive: true })
        await writeFile(resolve(routeDirectory, 'index.html'), withRouteMetadata(indexHtml, route))
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), githubPagesRouteFallbacks()],
  server: {
    port: 5173,
    open: true
  }
})
