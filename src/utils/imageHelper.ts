/**
 * Hämtar korrekt sökväg till bilder i public/images.
 * Sökvägen är absolut (utgår från BASE_URL) så att den fungerar oavsett
 * vilken URL sidan visas på, t.ex. /boende eller /boende/.
 */
export const getImg = (path: string) => {
  // Använd WebP-versionen om filnamnet slutar på .jpg
  const webpPath = path.replace(/\.jpg$/i, '.webp');
  return `${import.meta.env.BASE_URL}images/${webpPath}`;
};
