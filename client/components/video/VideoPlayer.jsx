"use client";

import { useEffect, useRef } from 'react';

export default function VideoPlayer({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    let active = true;

    async function loadHls() {
      try {
        const HlsModule = await import('hls.js');
        if (!active || !ref.current) {
          return;
        }
        if (HlsModule.default.isSupported()) {
          const hls = new HlsModule.default({ enableWorker: true, startLevel: -1, capLevelToPlayerSize: true });
          hls.loadSource(src);
          hls.attachMedia(ref.current);
        } else {
          ref.current.src = src;
        }
      } catch (error) {
        if (ref.current) {
          ref.current.src = src;
        }
      }
    }

    loadHls();
    return () => {
      active = false;
    };
  }, [src]);

  return <video ref={ref} poster={poster} controls className="aspect-[9/16] w-full rounded-2xl bg-black" />;
}
