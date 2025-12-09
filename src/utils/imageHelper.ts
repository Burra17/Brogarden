// src/utils/imageHelper.ts

/**
 * Hämtar korrekt sökväg till bilder.
 * Fungerar både lokalt och på GitHub Pages tack vare relativ sökväg (./).
 */
export const getImg = (path: string) => {
    return `./images/${path}`;
};