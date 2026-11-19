const BACKEND_BASE = 'https://innovation-academy-eight.vercel.app';
const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';

/**
 * Formats image URL to ensure compatibility across cloud CDN and backend
 */
export function formatImageUrl(url) {
  if (!url) return DEFAULT_FALLBACK_IMAGE;

  // Fully-qualified URLs (Cloudinary, Unsplash, HTTPS external)
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Relative /uploads path: Route through backend Vercel domain in production
  if (url.startsWith('/uploads')) {
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      return `${BACKEND_BASE}${url}`;
    }
  }

  return url;
}

/**
 * Image error handler that safely retries from Vercel backend or falls back
 * (NEVER calls localhost:5001 in production, which triggers browser security warnings)
 */
export function handleImageError(e, fallbackUrl = '') {
  if (!e || !e.target) return;

  if (!e.target.dataset.retried) {
    e.target.dataset.retried = 'true';
    const currentSrc = e.target.getAttribute('src') || '';

    // If an uploads image failed, try direct Vercel backend once
    if (currentSrc.includes('/uploads/')) {
      const uploadPath = currentSrc.substring(currentSrc.indexOf('/uploads/'));
      if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
        e.target.src = `${BACKEND_BASE}${uploadPath}`;
        return;
      }
    }
  }

  // Final fallback to prevent broken images and private network security prompts
  e.target.src = fallbackUrl || DEFAULT_FALLBACK_IMAGE;
}
