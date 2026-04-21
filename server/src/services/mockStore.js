import { slugify } from '../utils/slugify.js';

const creators = [
  {
    id: 'creator-1',
    username: 'shrimp-official',
    displayName: 'Shrimp Official',
    bio: 'Official account for Shrimp.',
    avatarUrl: 'https://picsum.photos/seed/shrimp-official/400/400',
    subscriberCount: 125000,
    totalViews: 4200000,
    totalLikes: 840000,
    isCreator: true,
    isVerified: true,
    creatorTier: 'elite',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'creator-2',
    username: 'techwithtim',
    displayName: 'Tech With Tim',
    bio: 'Short tech explainers and builder clips.',
    avatarUrl: 'https://picsum.photos/seed/techwithtim/400/400',
    subscriberCount: 98000,
    totalViews: 2100000,
    totalLikes: 410000,
    isCreator: true,
    isVerified: false,
    creatorTier: 'pro',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const videos = Array.from({ length: 30 }).map((_, index) => {
  const id = `video-${index + 1}`;
  const title = index % 2 === 0 ? `Sunset Drone Footage ${index + 1}` : `Crispy Food Closeup ${index + 1}`;
  const slug = slugify(title);
  const creator = creators[index % creators.length];
  return {
    id,
    slug,
    title,
    description: `A visually rich short video titled ${title.toLowerCase()}.`,
    thumbnailUrl: `https://picsum.photos/seed/${id}/720/1280`,
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 75 + index,
    width: 720,
    height: 1280,
    viewCount: 1000 + index * 211,
    likeCount: 120 + index * 7,
    commentCount: 20 + index,
    publishedAt: new Date(Date.now() - index * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['trending', 'shorts'],
    hashtags: [{ tag: 'satisfying' }, { tag: 'viral' }],
    creator,
    creatorId: creator.id,
    status: 'active',
    visibility: 'public',
  };
});

export function getVideoById(id) {
  return videos.find((video) => video.id === id) || null;
}

export function getCreatorByUsername(username) {
  return creators.find((creator) => creator.username === username) || null;
}

export function listVideos() {
  return videos;
}

export function listCreators() {
  return creators;
}

export function listHashtags() {
  return [
    { id: 'tag-1', tag: 'satisfying', videoCount: 18, trendScore: 98 },
    { id: 'tag-2', tag: 'travel', videoCount: 12, trendScore: 84 },
    { id: 'tag-3', tag: 'food', videoCount: 20, trendScore: 91 },
  ];
}
