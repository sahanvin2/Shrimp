import Link from 'next/link';
import { Avatar } from '../ui/Avatar';

export function CreatorCard({ creator }) {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <Link href={`/${creator.username}`} className="flex items-center gap-3">
        <Avatar src={creator.avatarUrl} alt={`${creator.displayName} avatar`} size={48} />
        <div>
          <h3 className="font-semibold">{creator.displayName}</h3>
          <p className="text-sm text-[var(--color-text-2)]">@{creator.username}</p>
        </div>
      </Link>
    </article>
  );
}
