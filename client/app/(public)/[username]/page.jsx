import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '../../../components/seo/JsonLd';
import { VideoCard } from '../../../components/video/VideoCard';
import { fetchCreatorByUsername, fetchPublicVideos } from '../../../lib/api';

export async function generateMetadata({ params }) {
  const creator = await fetchCreatorByUsername(params.username);
  if (!creator) {
    return { title: 'Creator not found' };
  }

  return {
    title: `${creator.displayName} (@${creator.username})`,
    description: creator.bio ? creator.bio.slice(0, 155) : `Watch ${creator.displayName}'s short videos on Shrimp.`,
    alternates: { canonical: `https://shrimp.app/${creator.username}` },
    openGraph: {
      type: 'profile',
      title: `${creator.displayName} on Shrimp`,
      description: creator.bio?.slice(0, 155),
      url: `https://shrimp.app/${creator.username}`,
      images: [{ url: creator.avatarUrl || '/og-default.jpg', width: 400, height: 400, alt: creator.displayName }],
      profile: { firstName: creator.displayName.split(' ')[0], username: creator.username },
    },
    twitter: {
      card: 'summary',
      title: `${creator.displayName} (@${creator.username})`,
      description: creator.bio?.slice(0, 155),
      images: [creator.avatarUrl || '/og-default.jpg'],
    },
  };
}

export const revalidate = 60;

export default async function CreatorPage({ params }) {
  const creator = await fetchCreatorByUsername(params.username);
  if (!creator) {
    notFound();
  }
  const videos = await fetchPublicVideos();
  const creatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: creator.createdAt,
    dateModified: creator.updatedAt,
    url: `https://shrimp.app/${creator.username}`,
    name: `${creator.displayName} on Shrimp`,
    mainEntity: {
      '@type': 'Person',
      name: creator.displayName,
      alternateName: `@${creator.username}`,
      description: creator.bio,
      image: creator.avatarUrl,
      url: `https://shrimp.app/${creator.username}`,
      sameAs: creator.website ? [creator.website] : [],
    },
  };

  return (
    <article>
      <JsonLd data={creatorJsonLd} />
      <h1 className="text-4xl font-bold tracking-[-0.03em]">{creator.displayName}</h1>
      <p className="mt-2 text-[var(--color-text-2)]">@{creator.username}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {videos.slice(0, 8).map((video, index) => <VideoCard key={video.id} video={video} priority={index === 0} />)}
      </div>
      <div className="mt-8">
        <Link href={`/`} className="text-[var(--color-primary)]">Back to home</Link>
      </div>
    </article>
  );
}
