// src/utils/imageHelper.ts

/**
 * H�mtar korrekt s�kv�g till bilder.
 * Fungerar b�de lokalt och p� GitHub Pages tack vare relativ s�kv�g (./).
 */
export const getImg = (path: string) => {
  // Använd WebP-versionen om filnamnet slutar på .jpg
  const webpPath = path.replace(/\.jpg$/i, '.webp');
  return `./images/${webpPath}`;
};
