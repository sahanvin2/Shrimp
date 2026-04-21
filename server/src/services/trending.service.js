import { getTrendingBundle as getTrendingBundleFromCatalog } from './catalog.service.js';

export async function getTrendingBundle() {
  try {
    return await getTrendingBundleFromCatalog();
  } catch (error) {
    throw error;
  }
}
