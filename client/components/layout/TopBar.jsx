import Link from 'next/link';

export function TopBar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[rgba(10,10,15,0.75)] backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-[-0.03em]">Shrimp</Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm text-[var(--color-text-2)]">
          <Link href="/trending">Trending</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/login">Log in</Link>
        </nav>
      </div>
    </header>
  );
}
