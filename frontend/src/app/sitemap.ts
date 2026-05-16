import { MetadataRoute } from 'next';

async function getExamSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams?limit=100`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data?.map((e: any) => e.slug) || [];
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://examalert.in';
  const slugs = await getExamSlugs();

  const staticPages = [
    { url: baseUrl, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/exams`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/eligibility`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/exams?category=psc`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/exams?category=banking`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/exams?category=railways`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/exams?category=teaching`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/exams?category=police`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/exams?qualification=10th`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/exams?qualification=degree`, changeFrequency: 'daily' as const, priority: 0.7 },
  ];

  const examPages = slugs.map(slug => ({
    url: `${baseUrl}/exams/${slug}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...examPages];
}
