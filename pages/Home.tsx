import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trees, Home as HomeIcon, Heart } from 'lucide-react';

// Helper to get correct path regardless of deployment (GitHub Pages etc)
const getImg = (path: string) => {
  const meta = import.meta as any;
  const baseUrl = meta.env?.BASE_URL ?? '/';
  return `${baseUrl}images/${path}`;
};

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getImg('home-hero.jpg')}
            onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/brogardenhero/1920/1080'} // Fallback if file missing
            alt="Brogården natur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 animate-fade-in-up drop-shadow-lg">
            Välkommen till Brogården!
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 font-light leading-relaxed drop-shadow-md">
            Lägergård, vandrarhem och EFS-kyrka i lugn och naturskön miljö nära havet. En plats för vila, gemenskap och glädje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/boende" 
              className="px-8 py-4 bg-brand-lightGreen hover:bg-green-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Se våra rum & stugor <ArrowRight size={20} />
            </Link>
            <Link 
              to="/kontakt" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/50 font-semibold rounded-full transition-all flex items-center justify-center"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">Om Oss</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">En plats för möten</h2>
          <div className="w-24 h-1 bg-brand-lightGreen mx-auto mb-10 rounded-full"></div>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Brogården drivs ideellt av en lokal, kristen EFS-förening. Här erbjuds prisvärt boende i rum och stugor samt ställplatser för husbil och tält. Gården används även för läger, dop, bröllop, föreningsdagar och gudstjänster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-brand-cream rounded-xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Trees size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Naturnära</h3>
              <p className="text-gray-600 text-sm">Omgiven av skog och vatten, perfekt för återhämtning.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-xl">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Hemtrevligt</h3>
              <p className="text-gray-600 text-sm">Enkla, mysiga rum och stugor med personlig touch.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-xl">
              <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Gemenskap</h3>
              <p className="text-gray-600 text-sm">En mötesplats för alla åldrar, driven av ideella krafter.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Decorative Image Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-64">
        {[1, 2, 3, 4].map((num) => (
          <img 
            key={num}
            src={getImg(`collage-${num}.jpg`)} 
            onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/camp${num}/800/600`}
            alt="Natur och miljö" 
            className="w-full h-full object-cover" 
          />
        ))}
      </div>
    </>
  );
};

export default Home;