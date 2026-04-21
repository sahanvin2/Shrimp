import { listVideos } from './catalog.service.js';

export async function buildForYouFeed() {
  try {
    return await listVideos(20);
  } catch (error) {
    throw error;
  }
}
