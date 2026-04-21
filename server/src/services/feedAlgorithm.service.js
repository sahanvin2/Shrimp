import { listVideos } from './mockStore.js';

export async function buildForYouFeed() {
  try {
    return listVideos().slice(0, 20);
  } catch (error) {
    throw error;
  }
}
