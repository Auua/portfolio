import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { SUPPORTED_LANGUAGES } from '../i18n/lang.mjs';

(async () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || 'https://localhost:3000';

  const links = [];
  SUPPORTED_LANGUAGES.forEach((locale) => {
    links.push({
      url: `/${locale}`,
      changefreq: 'monthly',
      priority: 0.9,
    });
    links.push({
      url: `/${locale}/contact`,
      changefreq: 'monthly',
      priority: 0.5,
    });
  });

  const sitemapStream = new SitemapStream({ hostname: siteUrl });

  const sitemapPromise = streamToPromise(sitemapStream).then((data) =>
    data.toString(),
  );

  sitemapStream.pipe(createWriteStream(resolve('public', 'sitemap.xml')));

  links.forEach((link) => sitemapStream.write(link));

  sitemapStream.end();

  try {
    await sitemapPromise;
    console.log('Sitemap generated successfully.');
  } catch (e) {
    console.error('Failed to generate sitemap:', e);
  }
})();
