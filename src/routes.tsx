import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Gallery from './pages/Gallery';
import Program from './pages/Program';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export interface PageMeta {
  /** Sidans <title> */
  title: string;
  /** Sidans meta-beskrivning */
  description: string;
  element: React.ReactNode;
}

export interface PageRoute extends PageMeta {
  path: string;
  /** Text i huvudmenyn */
  label: string;
  /** Text under "Hitta snabbt" i footern – sidor utan etikett visas inte där */
  footerLabel?: string;
}

// Sajtens enda lista över sidor. Router, meny, footer, sidtitlar och förrenderingen byggs härifrån.
export const routes: PageRoute[] = [
  {
    path: '/',
    label: 'Hem',
    title: 'Brogården – Lägergård & vandrarhem i Njutånger',
    description: 'Brogården i Njutånger – lägergård, vandrarhem och EFS-kyrka nära havet. Prisvärt boende i rum, stugor och på ställplats.',
    element: <Home />,
  },
  {
    path: '/boende',
    label: 'Boende',
    title: 'Boende – Brogården',
    description:
      'Bo på Brogården: dubbelrum, stugor samt ställplats för husvagn, husbil och tält. Prisvärt boende nära natur och vatten i Njutånger.',
    element: <Accommodation />,
    footerLabel: 'Boende',
  },
  {
    path: '/bilder',
    label: 'Bilder',
    title: 'Bildgalleri – Brogården',
    description: 'Bilder från Brogården – miljön, byggnaderna och livet på gården i Njutånger.',
    element: <Gallery />,
    footerLabel: 'Galleri',
  },
  {
    path: '/program',
    label: 'Program',
    title: 'Program & Aktiviteter – Brogården',
    description: 'Program och aktiviteter på Brogården: läger, gudstjänster, musikkvällar och andra samlingar. Se kalendern.',
    element: <Program />,
    footerLabel: 'Kalender',
  },
  {
    path: '/kontakt',
    label: 'Kontakt',
    title: 'Kontakt – Brogården',
    description: 'Kontakta Brogården för bokning och frågor. Telefon, e-post och vägbeskrivning till Örängesvägen 19 i Njutånger.',
    element: <Contact />,
    footerLabel: 'Hitta hit',
  },
];

// Visas för okända sökvägar och förrenderas till 404.html
export const notFoundPage: PageMeta = {
  title: 'Sidan finns inte – Brogården',
  description: 'Sidan du letar efter finns inte på Brogårdens webbplats.',
  element: <NotFound links={routes} />,
};
