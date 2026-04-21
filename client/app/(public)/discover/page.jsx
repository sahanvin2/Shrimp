import { VideoCard } from '../../../components/video/VideoCard';
import { fetchDiscover } from '../../../lib/api';

export const metadata = {
  title: 'Discover',
  description: 'Browse creators and videos on Shrimp.',
  alternates: { canonical: 'https://shrimp.app/discover' },
};

export default async function DiscoverPage() {
  const videos = await fetchDiscover();
  return (
    <section>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Discover</h1>
      <div className="mt-6 flex flex-wrap gap-2 text-sm text-[var(--color-text-2)]">
        {['For You', 'Gaming', 'Comedy', 'Beauty', 'Food', 'Travel', 'Tech', 'Music', 'Sports', 'DIY', 'Animals', 'Art'].map((chip) => (
          <span key={chip} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1">{chip}</span>
        ))}
      </div>
      <div className="mt-8 columns-2 gap-4 md:columns-3 xl:columns-4">
        {(videos || []).map((video, index) => (
          <div key={video.id} className="mb-4 break-inside-avoid">
            <VideoCard video={video} priority={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
