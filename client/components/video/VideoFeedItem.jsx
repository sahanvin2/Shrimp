import VideoPlayer from './VideoPlayer';

export function VideoFeedItem({ video }) {
  return (
    <section className="h-dvh snap-start overflow-hidden border-b border-[var(--color-border)]">
      <VideoPlayer src={video.hlsUrl} poster={video.thumbnailUrl} />
    </section>
  );
}
