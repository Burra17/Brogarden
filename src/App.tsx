import { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy-loadade sidor för snabbare initial laddning
const Home = lazy(() => import('./pages/Home'));
const Accommodation = lazy(() => import('./pages/Accommodation'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Program = lazy(() => import('./pages/Program'));
const Contact = lazy(() => import('./pages/Contact'));

// Scrollar till toppen och triggar fade-in vid sidbyte
const PageShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Suspense fallback={<div className="min-h-screen bg-brand-cream" />}>
          <PageShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boende" element={<Accommodation />} />
              <Route path="/bilder" element={<Gallery />} />
              <Route path="/program" element={<Program />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </PageShell>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;