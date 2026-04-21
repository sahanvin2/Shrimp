import { listCreators, listHashtags, listVideos } from './mockStore.js';

export async function getTrendingBundle() {
  try {
    return {
      hashtags: listHashtags(),
      creators: listCreators().slice(0, 10),
      videos: listVideos().slice(0, 20),
    };
  } catch (error) {
    throw error;
  }
}
