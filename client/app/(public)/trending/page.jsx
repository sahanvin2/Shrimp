import { JsonLd } from '../../../components/seo/JsonLd';
import { VideoCard } from '../../../components/video/VideoCard';
import { fetchTrendingBundle } from '../../../lib/api';

export const metadata = {
  title: 'Trending',
  description: 'Discover what is trending on Shrimp right now.',
  alternates: { canonical: 'https://shrimp.app/trending' },
};

export const revalidate = 1800;

export default async function TrendingPage() {
  const bundle = await fetchTrendingBundle();
  const trendingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trending Videos on Shrimp',
    url: 'https://shrimp.app/trending',
    itemListElement: (bundle.videos || []).slice(0, 20).map((video, index) => ({
      '@type': 'ListItem', position: index + 1, url: `https://shrimp.app/video/${video.id}/${video.slug}`, name: video.title,
    })),
  };

  return (
    <>
      <JsonLd data={trendingJsonLd} />
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Trending on Shrimp</h1>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Trending Hashtags</h2>
        <div className="flex flex-wrap gap-2">
          {(bundle.hashtags || []).map((hashtag) => (
            <span key={hashtag.tag} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-sm">
              #{hashtag.tag} · {hashtag.videoCount}
            </span>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Rising Creators</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(bundle.creators || []).map((creator) => (
            <article key={creator.username} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <h3 className="font-semibold">{creator.displayName}</h3>
              <p className="text-sm text-[var(--color-text-2)]">@{creator.username}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Trending Videos</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(bundle.videos || []).map((video, index) => <VideoCard key={video.id} video={video} priority={index === 0} />)}
        </div>
      </section>
    </>
  );
}
