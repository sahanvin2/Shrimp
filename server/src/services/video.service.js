import { getVideoById, listVideos } from './mockStore.js';

export async function fetchVideo(id) {
  try {
    return getVideoById(id);
  } catch (error) {
    throw error;
  }
}

export async function fetchRelatedVideos() {
  try {
    return listVideos().slice(0, 10);
  } catch (error) {
    throw error;
  }
}
