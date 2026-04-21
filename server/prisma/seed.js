import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/utils/slugify.js';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.report.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.userEvent.deleteMany();
    await prisma.watchHistory.deleteMany();
    await prisma.save.deleteMany();
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.videoHashtag.deleteMany();
    await prisma.video.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.hashtag.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        displayName: 'Shrimp Admin',
        email: 'admin@shrimp.app',
        passwordHash: 'hashed',
        isAdmin: true,
        isCreator: true,
      },
    });

    const creators = await Promise.all(Array.from({ length: 5 }).map((_, index) => prisma.user.create({
      data: {
        username: `creator${index + 1}`,
        displayName: `Creator ${index + 1}`,
        email: `creator${index + 1}@shrimp.app`,
        passwordHash: 'hashed',
        avatarUrl: `https://picsum.photos/seed/creator${index + 1}/400/400`,
        bio: 'Creator bio for Shrimp.',
        isCreator: true,
      },
    })));

    const hashtags = await Promise.all(Array.from({ length: 20 }).map((_, index) => prisma.hashtag.create({
      data: { tag: `tag${index + 1}`, trendScore: 100 - index },
    })));

    const videos = [];
    for (let index = 0; index < 30; index += 1) {
      const creator = creators[index % creators.length];
      const title = `Video ${index + 1} by ${creator.displayName}`;
      const video = await prisma.video.create({
        data: {
          creatorId: creator.id,
          title,
          slug: slugify(title),
          description: `A demo video for ${title}.`,
          tags: ['demo', 'shrimp'],
          thumbnailUrl: `https://picsum.photos/seed/video${index + 1}/720/1280`,
          hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          status: 'active',
          visibility: 'public',
          publishedAt: new Date(),
        },
      });
      videos.push(video);

      await prisma.videoHashtag.createMany({
        data: hashtags.slice(0, 2).map((hashtag) => ({ videoId: video.id, hashtagId: hashtag.id })),
      });
    }

    await Promise.all(creators.map((creator) => prisma.follow.create({
      data: { followerId: admin.id, followingId: creator.id },
    })));

    await Promise.all(videos.slice(0, 10).map((video, index) => prisma.like.create({
      data: { userId: admin.id, videoId: video.id },
    })));

    await Promise.all(videos.slice(0, 10).map((video, index) => prisma.save.create({
      data: { userId: admin.id, videoId: video.id },
    })));

    await Promise.all(videos.slice(0, 10).map((video) => prisma.comment.create({
      data: { videoId: video.id, userId: admin.id, body: 'Great video.' },
    })));

    await prisma.watchHistory.create({
      data: { userId: admin.id, videoId: videos[0].id, watchPercent: 95, watchedSeconds: 70 },
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
