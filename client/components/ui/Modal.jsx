export function Modal({ children, open }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">{children}</div>;
}
