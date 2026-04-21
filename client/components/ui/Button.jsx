export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2 text-sm font-medium text-[var(--color-text-1)] transition hover:bg-[var(--color-surface-3)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
