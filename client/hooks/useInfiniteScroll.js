import { useEffect, useRef } from 'react';

export function useInfiniteScroll(onReachEnd) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        onReachEnd?.();
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [onReachEnd]);

  return ref;
}
