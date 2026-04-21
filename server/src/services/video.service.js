import { getVideoById, listVideos } from './catalog.service.js';

export async function fetchVideo(id) {
  try {
    return await getVideoById(id);
  } catch (error) {
    throw error;
  }
}

export async function fetchRelatedVideos() {
  try {
    return await listVideos(10);
  } catch (error) {
    throw error;
  }
}
