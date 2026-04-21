import { notFound, redirect } from 'next/navigation';
import { JsonLd } from '../../../../../components/seo/JsonLd';
import { BreadcrumbNav } from '../../../../../components/seo/BreadcrumbNav';
import { HashtagPill } from '../../../../../components/ui/HashtagPill';
import VideoPlayer from '../../../../../components/video/VideoPlayer';
import { fetchVideoById } from '../../../../../lib/api';

export async function generateMetadata({ params }) {
  const video = await fetchVideoById(params.id);
  if (!video) {
    return { title: 'Video not found' };
  }

  const description = video.description
    ? `${video.description.slice(0, 155)}${video.description.length > 155 ? '...' : ''}`
    : `Watch ${video.title} by ${video.creator.displayName} on Shrimp.`;

  return {
    title: video.title,
    description,
    alternates: { canonical: `https://shrimp.app/video/${video.id}/${video.slug}` },
    openGraph: {
      type: 'video.other',
      title: `${video.title} · Shrimp`,
      description,
      url: `https://shrimp.app/video/${video.id}/${video.slug}`,
      images: [{ url: video.thumbnailUrl, width: 1280, height: 720, alt: `${video.title} — thumbnail` }],
      videos: [{ url: video.hlsUrl, type: 'application/x-mpegURL', width: video.width, height: video.height }],
      siteName: 'Shrimp',
    },
    twitter: { card: 'player', title: video.title, description, images: [video.thumbnailUrl] },
  };
}

export const revalidate = 60;

export default async function VideoPage({ params }) {
  const video = await fetchVideoById(params.id);
  if (!video) {
    notFound();
  }
  if (video.slug !== params.slug) {
    redirect(`/video/${video.id}/${video.slug}`);
  }

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || `${video.title} by ${video.creator.displayName}`,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.publishedAt,
    duration: `PT${Math.floor(video.duration)}S`,
    contentUrl: video.hlsUrl,
    embedUrl: `https://shrimp.app/embed/${video.id}`,
    url: `https://shrimp.app/video/${video.id}/${video.slug}`,
    author: { '@type': 'Person', name: video.creator.displayName, url: `https://shrimp.app/${video.creator.username}`, image: video.creator.avatarUrl },
    publisher: { '@type': 'Organization', name: 'Shrimp', logo: { '@type': 'ImageObject', url: 'https://shrimp.app/shrimp-logo.svg' } },
    interactionStatistic: [],
    keywords: (video.hashtags || []).map((hashtag) => hashtag.tag).join(', '),
    inLanguage: 'en',
    isFamilyFriendly: true,
    potentialAction: { '@type': 'WatchAction', target: `https://shrimp.app/video/${video.id}/${video.slug}` },
  };

  return (
    <article className="space-y-6">
      <JsonLd data={videoJsonLd} />
      <BreadcrumbNav items={[{ href: '/', label: 'Home' }, { href: '/discover', label: 'Discover' }, { label: video.title }]} />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="space-y-4">
          <VideoPlayer src={video.hlsUrl} poster={video.thumbnailUrl} />
          <h1 className="text-3xl font-bold tracking-[-0.03em]">{video.title}</h1>
          <p className="text-[var(--color-text-2)]">{video.description}</p>
          <div className="flex flex-wrap gap-2">
            {(video.hashtags || []).map((hashtag) => <HashtagPill key={hashtag.tag} tag={hashtag.tag} />)}
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-text-2)]">Creator</p>
          <a href={`/${video.creator.username}`} className="font-semibold">{video.creator.displayName}</a>
          <p className="text-sm text-[var(--color-text-2)]">{video.creator.subscriberCount?.toLocaleString?.() || 0} followers</p>
        </aside>
      </div>
    </article>
  );
}
