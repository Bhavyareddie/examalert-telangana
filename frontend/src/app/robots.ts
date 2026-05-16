import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://examalert.in';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/profile', '/bookmarks'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
