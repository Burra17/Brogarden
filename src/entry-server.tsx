import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';

// Ingång för förrenderingen (scripts/prerender.mjs). Byggs separat med `vite build --ssr`.
export { routes, notFoundPage } from './routes';
export { contactInfo } from './data/contactInfo';

// Renderar appen för en sökväg till en HTML-sträng
export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
