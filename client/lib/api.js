const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchPublicVideos() {
  try {
    const result = await request('/api/feed/trending');
    return result.data?.videos || result.data || [];
  } catch (error) {
    return [];
  }
}

export async function fetchTrendingBundle() {
  try {
    const result = await request('/api/feed/trending');
    return result.data || { hashtags: [], creators: [], videos: [] };
  } catch (error) {
    return { hashtags: [], creators: [], videos: [] };
  }
}

export async function fetchVideoById(id) {
  try {
    const result = await request(`/api/videos/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function fetchCreatorByUsername(username) {
  try {
    const result = await request(`/api/users/${username}`);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function fetchCreators() {
  try {
    const result = await request('/api/creators');
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export async function fetchHashtags() {
  try {
    const result = await request('/api/discover');
    return result.data?.hashtags || [];
  } catch (error) {
    return [];
  }
}

export async function fetchDiscover() {
  try {
    const result = await request('/api/feed/foryou');
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export async function searchContent(query) {
  try {
    const result = await request(`/api/search?q=${encodeURIComponent(query)}`);
    return result.data || { videos: [], creators: [], hashtags: [] };
  } catch (error) {
    return { videos: [], creators: [], hashtags: [] };
  }
}
