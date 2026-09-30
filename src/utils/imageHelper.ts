// Bredderna som scripts/optimizeImages.mjs skapar vid bygget – delas via JSON-filen
import WIDTHS from './imageWidths.json';

// Filnamnet utan ändelse, t.ex. 'gallery-1.jpg' → 'gallery-1'
const baseName = (path: string) => path.replace(/\.(jpg|webp)$/i, '');

const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

/**
 * Hämtar sökvägen till en bild i public/images. Referera med .jpg-namn – bilden
 * serveras som WebP. I produktion pekar den på den största optimerade varianten
 * (1920 px), i dev på originalet eftersom varianterna bara finns efter bygget.
 * Sökvägen är absolut så att den fungerar oavsett URL, t.ex. /boende/.
 */
export const getImg = (path: string) => {
  const name = baseName(path);
  return imageUrl(import.meta.env.DEV ? `${name}.webp` : `${name}-1920.webp`);
};

/**
 * srcset med alla optimerade bredder, så att webbläsaren väljer den minsta som
 * räcker. Används tillsammans med ett sizes-attribut som beskriver bildens bredd
 * i layouten. Returnerar undefined i dev, där bara originalen finns.
 */
export const getImgSrcSet = (path: string) => {
  if (import.meta.env.DEV) return undefined;
  const name = baseName(path);
  return WIDTHS.map((width) => `${imageUrl(`${name}-${width}.webp`)} ${width}w`).join(', ');
};
