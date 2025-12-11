import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Hem', path: '/' },
    { label: 'Boende', path: '/boende' },
    { label: 'Bilder', path: '/bilder' },
    { label: 'Program', path: '/program' },
    { label: 'Kontakt', path: '/kontakt' },
];

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);


    const hasHeroImage = ['/', '/boende', '/kontakt', '/bilder', '/program'].includes(location.pathname);

    // Header should be transparent only if we are on a hero page AND haven't scrolled
    // Otherwise it should be solid white (scrolled style) for readability
    const isTransparent = hasHeroImage && !scrolled;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header
                className={`fixed w-full z-50 transition-all duration-300 ${isTransparent
                        ? 'bg-transparent py-4'
                        : 'bg-white/95 backdrop-blur-sm shadow-md py-2'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <Link to="/" className={`text-2xl font-bold font-serif tracking-tight ${!isTransparent ? 'text-brand-green' : 'text-white drop-shadow-md'}`}>
                        Brogården
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`font-medium transition-colors hover:text-brand-lightGreen ${isActive
                                            ? 'text-brand-lightGreen border-b-2 border-brand-lightGreen'
                                            : !isTransparent ? 'text-gray-700' : 'text-white drop-shadow-md'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className={!isTransparent ? 'text-gray-800' : 'text-white'} size={28} />
                        ) : (
                            <Menu className={!isTransparent ? 'text-gray-800' : 'text-white'} size={28} />
                        )}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 animate-slide-in-from-top-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`py-3 text-lg font-medium border-b border-gray-50 last:border-0 ${location.pathname === item.path ? 'text-brand-green' : 'text-gray-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-brand-dark text-white py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Brand */}
                        <div>
                            <h3 className="text-xl font-bold font-serif mb-4">Brogården</h3>
                            <p className="text-gray-400 mb-4">
                                En plats för vila, gemenskap och glädje i Njutångers vackra natur.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/BrogardenEFSNjutanger"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-lightGreen transition-colors"
                                    aria-label="Besök oss på Facebook"
                                >
                                    <Facebook size={30} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <MapPin size={18} className="mt-1 flex-shrink-0 text-brand-lightGreen" />
                                    <span>Örängesvägen 19,<br />825 92 Njutånger</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={18} className="text-brand-lightGreen" />
                                    <a href="tel:065070284" className="hover:text-white">0650-70284</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={18} className="text-brand-lightGreen" />
                                    <a href="mailto:katarina.svedman@efs.nu" className="hover:text-white break-all">katarina.svedman@efs.nu</a>
                                </li>
                            </ul>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Hitta snabbt</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link to="/boende" className="hover:text-white transition-colors">Våra stugor</Link></li>
                                <li><Link to="/program" className="hover:text-white transition-colors">Kalender</Link></li>
                                <li><Link to="/kontakt" className="hover:text-white transition-colors">Hitta hit</Link></li>
                                <li><Link to="/bilder" className="hover:text-white transition-colors">Galleri</Link></li>
                            </ul>
                        </div>

                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
                        <p>&copy; 2025 Brogården – Alla rättigheter förbehållna</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;