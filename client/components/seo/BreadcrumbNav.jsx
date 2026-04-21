import Link from 'next/link';

export function BreadcrumbNav({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-text-2)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href || item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
