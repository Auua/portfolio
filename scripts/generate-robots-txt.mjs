import { writeFileSync } from 'fs';
import { resolve } from 'path';

const generateRobotsTxt = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || 'https://localhost:3000';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const robotsTxtContent = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Sitemap
Sitemap: ${sitemapUrl}
`;

  writeFileSync(resolve('public', 'robots.txt'), robotsTxtContent);
  console.log('robots.txt generated successfully.');
};

generateRobotsTxt();
