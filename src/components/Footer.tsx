import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { contactInfo } from '../data/contactInfo';
import { routes } from '../routes';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';

// Bara sidor med footerLabel visas under "Hitta snabbt"
const footerLinks = routes.filter((route) => route.footerLabel);

const Footer: React.FC = () => (
  <footer className='bg-brand-dark text-white py-12'>
    <div className='container mx-auto px-4 md:px-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Om Brogården */}
        <div>
          <h3 className='text-xl font-bold font-serif mb-4'>Brogården</h3>
          <p className='text-gray-400 mb-4'>
            En plats för vila, gemenskap och glädje i Njutångers vackra natur. Vi delar även med oss händelser här:
          </p>
          <div className='flex space-x-4'>
            <a
              href={contactInfo.facebookUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-brand-lightGreen transition-colors'
              aria-label='Besök oss på Facebook'
            >
              <FacebookIcon size={30} />
            </a>
            <a
              href={contactInfo.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-brand-lightGreen transition-colors'
              aria-label='Besök oss på Instagram'
            >
              <InstagramIcon size={30} />
            </a>
          </div>
        </div>

        {/* Kontaktuppgifter */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Kontakt</h3>
          <ul className='space-y-3 text-gray-300'>
            <li className='flex items-start gap-2'>
              <MapPin size={18} className='mt-1 flex-shrink-0 text-brand-lightGreen' />
              <span>
                {contactInfo.address.street},<br />
                {contactInfo.address.postal}
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <Phone size={18} className='text-brand-lightGreen' />
              <a href={contactInfo.phoneHref} className='hover:text-white'>
                {contactInfo.phone}
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <Mail size={18} className='text-brand-lightGreen' />
              <a href={contactInfo.emailHref} className='hover:text-white break-all'>
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Snabblänkar */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Hitta snabbt</h3>
          <ul className='space-y-2 text-gray-300'>
            {footerLinks.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className='hover:text-white transition-colors'>
                  {route.footerLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm'>
        {/* Året bakas in vid förrenderingen och kan vara ett år gammalt efter nyår tills nästa bygge */}
        <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Brogården – Alla rättigheter förbehållna</p>
      </div>
    </div>
  </footer>
);

export default Footer;
