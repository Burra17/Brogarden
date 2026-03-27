import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Gallery from './pages/Gallery';
import Program from './pages/Program';
import Contact from './pages/Contact';

// Scrollar till toppen och triggar fade-in vid sidbyte
const PageShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>{children}</>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <PageShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boende" element={<Accommodation />} />
            <Route path="/bilder" element={<Gallery />} />
            <Route path="/program" element={<Program />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </PageShell>
      </Layout>
    </Router>
  );
}

export default App;