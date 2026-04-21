import { JsonLd } from '../../../../../components/seo/JsonLd';
import { BreadcrumbNav } from '../../../../../components/seo/BreadcrumbNav';
import { VideoCard } from '../../../../../components/video/VideoCard';
import { fetchDiscover } from '../../../../../lib/api';

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} videos`,
    description: `Watch the best #${tag} short videos on Shrimp.`,
    alternates: { canonical: `https://shrimp.app/discover/hashtag/${tag}` },
    openGraph: { title: `#${tag} on Shrimp`, description: `Browse trending #${tag} videos`, url: `https://shrimp.app/discover/hashtag/${tag}` },
  };
}

export const revalidate = 60;

export default async function HashtagPage({ params }) {
  const tag = decodeURIComponent(params.tag);
  const videos = await fetchDiscover();
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shrimp.app' },
      { '@type': 'ListItem', position: 2, name: 'Discover', item: 'https://shrimp.app/discover' },
      { '@type': 'ListItem', position: 3, name: `#${tag}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <BreadcrumbNav items={[{ href: '/', label: 'Home' }, { href: '/discover', label: 'Discover' }, { label: `#${tag}` }]} />
      <h1 className="text-4xl font-bold tracking-[-0.03em]">#{tag}</h1>
      <div className="mt-8 columns-2 gap-4 md:columns-3 xl:columns-4">
        {(videos || []).map((video, index) => <div key={video.id} className="mb-4 break-inside-avoid"><VideoCard video={video} priority={index === 0} /></div>)}
      </div>
    </>
  );
}
