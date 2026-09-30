import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { routes } from '../routes';

// Sidhuvud med logga, desktopmeny och mobilmeny. Menyn byggs från sidlistan.
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stäng mobilmenyn vid varje navigering. Justeras under renderingen i stället
  // för i en effect, så att menyn aldrig hinner renderas öppen på den nya sidan.
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    setIsMenuOpen(false);
  }

  // Alla sidor har en hero-bild, så headern är transparent tills man scrollat
  const isTransparent = !scrolled;

  return (
    <header className={`fixed w-full z-50 py-2 ${isTransparent ? 'bg-transparent' : 'bg-white shadow-xs'}`}>
      <div className='container mx-auto px-4 md:px-6 flex justify-between items-center'>
        <Link
          to='/'
          className={`flex items-center gap-2 text-2xl font-bold font-serif tracking-tight ${!isTransparent ? 'text-brand-green' : 'text-white drop-shadow-md'}`}
        >
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt='' className='h-8 w-8' />
          Brogården
        </Link>

        {/* Desktopmeny */}
        <nav aria-label='Huvudmeny' className='hidden md:flex space-x-8'>
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={`font-medium transition-all duration-300 hover:text-brand-lightGreen relative pb-1 ${
                  isActive
                    ? 'text-brand-lightGreen after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-lightGreen after:rounded-full'
                    : !isTransparent
                      ? 'text-gray-700'
                      : 'text-white drop-shadow-md'
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Knapp för mobilmenyn */}
        <button
          type='button'
          className='md:hidden p-2 rounded-md'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
        >
          {isMenuOpen ? (
            <X className={!isTransparent ? 'text-gray-800' : 'text-white'} size={28} />
          ) : (
            <Menu className={!isTransparent ? 'text-gray-800' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobilmeny */}
      {isMenuOpen && (
        <nav
          id='mobile-menu'
          aria-label='Mobilmeny'
          className='md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 animate-slide-in-from-top-2'
        >
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`py-3 text-lg font-medium border-b border-gray-50 last:border-0 ${
                location.pathname === route.path ? 'text-brand-green' : 'text-gray-600'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
