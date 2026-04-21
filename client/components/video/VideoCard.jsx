import Image from 'next/image';
import Link from 'next/link';

export function VideoCard({ video, priority = false }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Link href={`/video/${video.id}/${video.slug}`}>
        <figure className="relative aspect-[9/16] w-full overflow-hidden bg-[var(--color-surface-2)]">
          <Image
            src={video.thumbnailUrl}
            alt={`${video.title} by ${video.creator?.displayName || 'Shrimp creator'}`}
            width={480}
            height={854}
            className="h-full w-full object-cover"
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
          />
          <figcaption className="sr-only">{video.title}</figcaption>
        </figure>
      </Link>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug">{video.title}</h3>
        <p className="text-sm text-[var(--color-text-2)]">{video.creator?.displayName || 'Shrimp creator'}</p>
      </div>
    </article>
  );
}
