import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Crawl-delay to prevent server overload
Crawl-delay: 1

# Disallow specific paths if any
# Disallow: /private/
# Disallow: /admin/

# Sitemap location
Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site ?? 'https://intelcomint.com');
  return new Response(getRobotsTxt(sitemapURL));
};
