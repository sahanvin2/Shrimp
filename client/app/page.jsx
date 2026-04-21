import Link from 'next/link';
import { JsonLd } from '../components/seo/JsonLd';
import { VideoCard } from '../components/video/VideoCard';
import { fetchPublicVideos } from '../lib/api';

export const metadata = {
  title: 'Shrimp — Watch & Share Short Videos',
  description: 'Discover trending short videos, follow creators, and share moments on Shrimp.',
  alternates: { canonical: 'https://shrimp.app' },
};

export default async function HomePage() {
  const videos = await fetchPublicVideos();
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shrimp',
    url: 'https://shrimp.app',
    description: 'Social short video platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://shrimp.app/search?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-text-2)]">Shrimp</p>
          <h1 className="max-w-xl text-5xl font-bold tracking-[-0.03em] md:text-6xl">Watch, create, and discover short videos built for search.</h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-2)]">A modern social video platform with SEO-first public pages, creator profiles, and a fast masonry discovery experience.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-black">Get started</Link>
            <Link href="/trending" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 font-semibold">Explore trending</Link>
          </div>
        </div>
        <div className="glass-card p-4">
          <p className="mb-4 text-sm text-[var(--color-text-2)]">Featured videos</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.slice(0, 4).map((video, index) => (
              <VideoCard key={video.id} video={video} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
      <section className="mt-12 grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:grid-cols-3">
        <div><p className="text-2xl font-bold">30+</p><p className="text-sm text-[var(--color-text-2)]">Videos uploaded</p></div>
        <div><p className="text-2xl font-bold">5+</p><p className="text-sm text-[var(--color-text-2)]">Creators</p></div>
        <div><p className="text-2xl font-bold">4.2M</p><p className="text-sm text-[var(--color-text-2)]">Total views</p></div>
      </section>
    </>
  );
}
