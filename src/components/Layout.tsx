import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

// Sätter ihop sidhuvud, sidinnehåll och sidfot
const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
