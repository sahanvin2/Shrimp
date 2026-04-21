"use client";

export default function Error({ error, reset }) {
  return (
    <section className="page-shell py-24 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-[var(--color-text-2)]">{error.message}</p>
      <button onClick={reset} className="mt-8 rounded-xl bg-[var(--color-primary)] px-4 py-2 font-medium text-black">Try again</button>
    </section>
  );
}
