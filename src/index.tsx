import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './index.css';
import { redirectLegacyHashUrl } from './utils/redirectLegacyHashUrl';

const wasRedirected = redirectLegacyHashUrl();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Förrenderad HTML hydreras. I dev finns ingen HTML, och efter en omskriven /#/-länk
// hör HTML:en till en annan sida – då renderas appen från början i stället.
if (rootElement.hasChildNodes() && !wasRedirected) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
