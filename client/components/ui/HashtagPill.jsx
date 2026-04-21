import Link from 'next/link';

export function HashtagPill({ tag }) {
  return (
    <Link href={`/discover/hashtag/${encodeURIComponent(tag)}`} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-1)]">
      #{tag}
    </Link>
  );
}
