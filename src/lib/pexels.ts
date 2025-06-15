// src/lib/pexels.ts
interface PexelsPhoto {
  src: { landscape: string; };
  alt: string;
}
interface PexelsResponse { photos: PexelsPhoto[]; }

const PEXELS_API_KEY = import.meta.env.PEXELS_API_KEY;
const DEFAULT_IMAGE_URL = '/assets/blog/default-fallback-image.svg';
const DEFAULT_IMAGE_ALT = 'Abstract technology background';

export async function getPexelsImage(query: string): Promise<{ imageUrl: string; imageAlt: string }> {
  if (!PEXELS_API_KEY) {
    console.error("Pexels API key is missing.");
    return { imageUrl: DEFAULT_IMAGE_URL, imageAlt: DEFAULT_IMAGE_ALT };
  }
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;
  try {
    const response = await fetch(url, { headers: { Authorization: PEXELS_API_KEY } });
    if (!response.ok) throw new Error(`Pexels API request failed: ${response.statusText}`);
    const data: PexelsResponse = await response.json();
    const photo = data.photos[0];
    if (photo) {
      return { imageUrl: photo.src.landscape, imageAlt: photo.alt || query };
    }
  } catch (error) {
    console.error(`Failed to fetch image for query "${query}":`, error);
  }
  return { imageUrl: DEFAULT_IMAGE_URL, imageAlt: DEFAULT_IMAGE_ALT };
}
