import Image from 'next/image';

export function Avatar({ src, alt, size = 40, className = '' }) {
  return (
    <span className={`relative inline-flex overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
      <Image src={src} alt={alt} width={size} height={size} className="h-full w-full object-cover" priority={false} />
    </span>
  );
}
