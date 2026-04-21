import Link from 'next/link';

const items = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/trending', label: 'Trending' },
  { href: '/following', label: 'Following' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/upload', label: 'Upload' },
  { href: '/studio', label: 'Studio' },
  { href: '/settings', label: 'Profile' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--color-border)] bg-[rgba(20,20,24,0.92)] p-5 xl:block">
      <Link href="/" className="mb-8 block text-xl font-semibold">Shrimp</Link>
      <nav aria-label="Sidebar navigation">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block rounded-xl px-3 py-2 text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
