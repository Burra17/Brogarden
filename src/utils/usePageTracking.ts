import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string }) => void };
  }
}

/**
 * Räknar sidvisningar i GoatCounter vid navigering inom appen.
 * GoatCounter räknar själv den första sidvisningen när skriptet laddas,
 * så första renderingen hoppas över för att inte räkna dubbelt.
 */
export const usePageTracking = (pathname: string) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);
};
