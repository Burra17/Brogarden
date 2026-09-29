import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Gallery from './pages/Gallery';
import Program from './pages/Program';
import Contact from './pages/Contact';
import { usePageTracking } from './utils/usePageTracking';

// Scrollar till toppen, triggar fade-in och räknar sidvisning vid sidbyte
const PageShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  usePageTracking(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <PageShell>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/boende' element={<Accommodation />} />
            <Route path='/bilder' element={<Gallery />} />
            <Route path='/program' element={<Program />} />
            <Route path='/kontakt' element={<Contact />} />
            {/* Okända sökvägar skickas till startsidan i stället för att visa en tom sida */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </PageShell>
      </Layout>
    </Router>
  );
}

export default App;
