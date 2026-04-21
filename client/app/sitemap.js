import { fetchCreators, fetchHashtags, fetchPublicVideos } from '../lib/api';

export default async function sitemap() {
  const [videos, creators, hashtags] = await Promise.all([
    fetchPublicVideos(),
    fetchCreators(),
    fetchHashtags(),
  ]);

  const now = new Date();
  return [
    { url: 'https://shrimp.app', lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: 'https://shrimp.app/trending', lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: 'https://shrimp.app/discover', lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://shrimp.app/privacy-policy', lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://shrimp.app/terms', lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://shrimp.app/dmca', lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...videos.map((video) => ({ url: `https://shrimp.app/video/${video.id}/${video.slug}`, lastModified: video.updatedAt || now, changeFrequency: 'weekly', priority: 0.7 })),
    ...creators.map((creator) => ({ url: `https://shrimp.app/${creator.username}`, lastModified: creator.updatedAt || now, changeFrequency: 'daily', priority: 0.6 })),
    ...hashtags.map((hashtag) => ({ url: `https://shrimp.app/discover/hashtag/${hashtag.tag}`, lastModified: now, changeFrequency: 'daily', priority: 0.5 })),
  ];
}

export const revalidate = 3600;
