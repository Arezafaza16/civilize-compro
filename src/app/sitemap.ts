import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import Project from '@/models/Project';
import TeamMember from '@/models/TeamMember';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civilize.com';

  await dbConnect();

  const [services, projects, team] = await Promise.all([
    Service.find().select('slug updatedAt').lean(),
    Project.find().select('slug updatedAt').lean(),
    TeamMember.find().select('slug updatedAt').lean(),
  ]);

  const serviceUrls = services.map((s: any) => ({
    url: `${baseUrl}/layanan/${s.slug}`,
    lastModified: s.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const projectUrls = projects.map((p: any) => ({
    url: `${baseUrl}/proyek/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const teamUrls = team.map((t: any) => ({
    url: `${baseUrl}/tim/${t.slug}`,
    lastModified: t.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...serviceUrls,
    ...projectUrls,
    ...teamUrls,
  ];
}
