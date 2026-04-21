import { notFound } from 'next/navigation';
import { VideoCard } from '../../../components/video/VideoCard';
import { searchContent } from '../../../lib/api';

export async function generateMetadata({ searchParams }) {
  const query = searchParams?.q || '';
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query ? `Search results for ${query} on Shrimp.` : 'Search Shrimp.',
    robots: query ? { index: true, follow: true } : { index: false, follow: false },
    alternates: query ? { canonical: `https://shrimp.app/search?q=${encodeURIComponent(query)}` } : undefined,
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  if (!query) {
    notFound();
  }
  const results = await searchContent(query);
  return (
    <section>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Search results for "{query}"</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(results.videos || []).map((video, index) => <VideoCard key={video.id} video={video} priority={index === 0} />)}
      </div>
    </section>
  );
}
