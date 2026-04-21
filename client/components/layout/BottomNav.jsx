import Link from 'next/link';

export function BottomNav() {
  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[rgba(10,10,15,0.92)] px-4 py-3 xl:hidden">
      <div className="flex items-center justify-around text-xs text-[var(--color-text-2)]">
        <Link href="/">Home</Link>
        <Link href="/discover">Discover</Link>
        <Link href="/trending">Trending</Link>
        <Link href="/upload">Upload</Link>
      </div>
    </nav>
  );
}
