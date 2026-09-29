import { useEffect } from 'react';

const SITE_URL = 'https://www.efsbrogarden.se';

/**
 * Sätter canonical-länken för aktuell sida så att Google indexerar varje
 * undersida för sig. Taggen finns medvetet inte i index.html – alla sidor
 * serveras från samma fil, och en statisk canonical skulle peka alla sidor
 * mot startsidan. Avslutande snedstreck tas bort så att /boende/ och /boende
 * räknas som samma sida.
 */
export const useCanonicalUrl = (pathname: string) => {
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${SITE_URL}${path}`;
  }, [pathname]);
};
