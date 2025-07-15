import React from 'react';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const generateSitemap = (): string => {
  const baseUrl = 'https://resilienthealthcare.com';
  const today = new Date().toISOString().split('T')[0];

  const pages: SitemapEntry[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/clinicians`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/patients`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/request-demo`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/care-at-home`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/news`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      loc: `${baseUrl}/terms-of-service`,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      loc: `${baseUrl}/hipaa-compliance`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/data-security`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Robots.txt content
export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://resilienthealthcare.com';
  
  return `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /login

# Allow important pages
Allow: /
Allow: /about
Allow: /clinicians
Allow: /patients
Allow: /contact
Allow: /request-demo
Allow: /care-at-home
Allow: /news

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
};

export const downloadRobotsTxt = () => {
  const robots = generateRobotsTxt();
  const blob = new Blob([robots], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};