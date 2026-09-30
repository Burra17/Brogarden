import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, matchPath } from 'react-router';
import Layout from './components/Layout';
import { routes } from './routes';
import { usePageTracking } from './hooks/usePageTracking';
import { useCanonicalUrl } from './hooks/useCanonicalUrl';

// Scrollar till toppen, sätter titel, beskrivning och canonical samt räknar sidvisning vid sidbyte
const PageShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  usePageTracking(pathname);
  useCanonicalUrl(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // matchPath hanterar avslutande snedstreck, så /boende/ hittar samma sida som /boende
  const page = routes.find((route) => matchPath(route.path, pathname));

  useEffect(() => {
    if (!page) return;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
  }, [page]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <PageShell>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {/* Okända sökvägar skickas till startsidan i stället för att visa en tom sida */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </PageShell>
      </Layout>
    </Router>
  );
}

export default App;
