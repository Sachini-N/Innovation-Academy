/**
 * Formats image URL to ensure compatibility across proxy and direct backend ports
 */
export function formatImageUrl(url) {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  return url;
}

/**
 * Image error handler that retries loading from localhost:5001 directly
 * if Vite dev server proxy failed to forward /uploads
 */
export function handleImageError(e, fallbackUrl = '') {
  if (e.target && !e.target.dataset.retried) {
    e.target.dataset.retried = 'true';
    const currentSrc = e.target.getAttribute('src') || '';
    if (currentSrc.includes('/uploads/')) {
      const uploadPath = currentSrc.substring(currentSrc.indexOf('/uploads/'));
      e.target.src = `http://localhost:5001${uploadPath}`;
      return;
    }
  }
  if (fallbackUrl) {
    e.target.src = fallbackUrl;
  } else if (e.target) {
    e.target.style.display = 'none';
  }
}

