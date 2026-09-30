import { useEffect } from 'react';
import { contactInfo } from '../data/contactInfo';

/**
 * Håller canonical-länken aktuell vid navigering inom appen, så att Google
 * indexerar varje undersida för sig. Förrenderingen bakar in samma länk i varje
 * sidas HTML. Utan sökväg (404-sidan) tas länken bort.
 */
export const useCanonicalUrl = (path: string | undefined) => {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!path) {
      link?.remove();
      return;
    }
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${contactInfo.siteUrl}${path}`;
  }, [path]);
};
