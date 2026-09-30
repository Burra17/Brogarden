import { Link } from 'react-router';
import PageHero from '../components/PageHero';

interface NotFoundProps {
  links: { path: string; label: string }[];
}

// Visas för okända sökvägar. Förrenderas till 404.html så att servern svarar med status 404.
const NotFound: React.FC<NotFoundProps> = ({ links }) => (
  <div className='bg-white pb-20'>
    <PageHero title='Sidan finns inte' subtitle='Adressen kan vara felstavad, eller så har sidan flyttats.' backgroundImage='home-hero.jpg' />

    <nav aria-label='Sidor på webbplatsen' className='container mx-auto px-4 text-center'>
      <h2 className='text-2xl font-bold font-serif text-gray-900 mb-6'>Här hittar du det som finns</h2>
      <ul className='flex flex-wrap justify-center gap-3'>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className='inline-block px-6 py-3 bg-brand-green text-white rounded-lg font-medium md:hover:bg-brand-dark transition-colors'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default NotFound;
