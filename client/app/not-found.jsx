import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-shell py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-[var(--color-text-2)]">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 inline-flex rounded-xl bg-[var(--color-primary)] px-4 py-2 font-medium text-black">Back to home</Link>
    </section>
  );
}
