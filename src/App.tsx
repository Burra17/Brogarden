import { useEffect } from 'react';
import { Routes, Route, useLocation, matchPath } from 'react-router';
import Layout from './components/Layout';
import { routes, notFoundPage } from './routes';
import { usePageTracking } from './hooks/usePageTracking';
import { useCanonicalUrl } from './hooks/useCanonicalUrl';

// Scrollar till toppen, sätter titel, beskrivning och canonical samt räknar sidvisning vid sidbyte.
// Förrenderingen bakar in samma metadata i HTML:en – hookarna håller den aktuell vid navigering i appen.
const PageShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  usePageTracking(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // matchPath hanterar avslutande snedstreck, så /boende/ hittar samma sida som /boende
  const route = routes.find((r) => matchPath(r.path, pathname));
  const page = route ?? notFoundPage;
  useCanonicalUrl(route?.path);

  useEffect(() => {
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
  }, [page]);

  return <>{children}</>;
};

// Routern injiceras av entry-filen: BrowserRouter i webbläsaren, StaticRouter vid förrendering
function App() {
  return (
    <Layout>
      <PageShell>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path='*' element={notFoundPage.element} />
        </Routes>
      </PageShell>
    </Layout>
  );
}

export default App;
