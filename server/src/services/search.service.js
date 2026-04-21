import { listCreators, listHashtags, listVideos } from './mockStore.js';

export async function searchAll(query) {
  try {
    const q = (query || '').toLowerCase();
    return {
      videos: listVideos().filter((video) => video.title.toLowerCase().includes(q)),
      creators: listCreators().filter((creator) => creator.displayName.toLowerCase().includes(q) || creator.username.includes(q)),
      hashtags: listHashtags().filter((tag) => tag.tag.includes(q)),
    };
  } catch (error) {
    throw error;
  }
}
