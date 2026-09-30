import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { getImg } from '../utils/imageHelper';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { aboutFeatures } from '../data/aboutFeatures';
import { AboutFeature } from '../types';

// Hero-knapparna, en inre lista per rad
const heroButtonRows = [
  [
    { to: '/boende', label: 'Se våra rum & stugor', showArrow: true },
    { to: '/program', label: 'Program & Läger', showArrow: true },
  ],
  [{ to: '/kontakt', label: 'Kontakta oss', showArrow: false }],
];

const heroButtonClass =
  'w-full sm:w-auto px-6 py-2.5 md:px-10 md:py-4 text-sm md:text-base bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/35 text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl';

// Ikonfärger för "Om oss"-korten
const featureToneClasses: Record<AboutFeature['tone'], string> = {
  green: 'bg-brand-lightGreen/10 text-brand-lightGreen',
  blue: 'bg-blue-50 text-blue-600',
  red: 'bg-red-50 text-red-600',
};

const Home: React.FC = () => {
  // Scroll reveal-refs för sektionerna nedanför heron
  const cardsRef = useScrollReveal<HTMLDivElement>();
  const collageRef = useScrollReveal<HTMLDivElement>();
  // Parallax-effekt på collage – bara desktop (mobil får lagg och vita linjer)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (prefersReducedMotion || isMobile) return;

    const container = collageRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // Bara beräkna när collaget är synligt
        if (rect.bottom > 0 && rect.top < viewHeight) {
          const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
          const offset = (progress - 0.5) * -30;
          const imgs = container.querySelectorAll('img');
          imgs.forEach((img) => {
            (img as HTMLElement).style.transform = `translateY(${offset}px) scale(1.08)`;
          });
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [collageRef]);

  return (
    <>
      {/* Hero */}
      <section className='relative h-hero-home flex items-center justify-center overflow-hidden'>
        {/* Bakgrundsbild utan mörkt lager */}
        <div className='absolute inset-0 z-0'>
          <img src={getImg('home-hero.jpg')} alt='Brogården natur' fetchPriority='high' className='w-full h-full object-cover hero-ken-burns' />
        </div>

        {/* Innehåll */}
        <div className='relative z-10 container mx-auto px-6 text-center text-white pt-20 pb-12 md:py-0'>
          {/* Rubrik med mjuk men djup skugga för läsbarhet mot ljus himmel */}
          <h1 className='hero-animate text-3xl md:text-7xl font-bold font-serif mb-4 md:mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-tight'>
            Välkommen till Brogården!
          </h1>

          {/* Beskrivning */}
          <p className='hero-animate hero-delay-1 text-base md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'>
            Lägergård, vandrarhem och EFS-kyrka i lugn och naturskön miljö nära havet. En plats för vila, gemenskap och glädje.
          </p>

          {/* Knappar – använder hero-animate-buttons som inte ändrar opacity */}
          <div className='hero-animate-buttons flex flex-col gap-3 md:gap-4 justify-center items-center w-full max-w-xs mx-auto sm:max-w-none'>
            {heroButtonRows.map((row) => (
              <div key={row[0].to} className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full'>
                {row.map((button) => (
                  <Link key={button.to} to={button.to} className={heroButtonClass}>
                    {button.label}
                    {button.showArrow && <ArrowRight size={18} />}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Om oss */}
      <section className='py-20 bg-white'>
        <div className='hero-animate hero-delay-2 container mx-auto px-4 max-w-4xl text-center'>
          <span className='text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block'>Om Oss</span>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6'>En plats för möten</h2>
          <div className='w-24 h-1 bg-brand-lightGreen mx-auto mb-10 rounded-full'></div>

          <p className='text-lg text-gray-700 leading-relaxed mb-12'>
            Brogården drivs ideellt av en lokal, kristen EFS-förening. Här erbjuds prisvärt boende i rum och stugor samt ställplatser för husbil och
            tält. Gården används även för läger, dop, bröllop, föreningsdagar och gudstjänster.
          </p>

          <div ref={cardsRef} className='reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8'>
            {aboutFeatures.map((feature) => (
              <div key={feature.title} className='p-6 bg-brand-cream/30 rounded-xl border border-gray-100 shadow-sm'>
                <div className={`w-12 h-12 ${featureToneClasses[feature.tone]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon size={24} />
                </div>
                <h3 className='font-bold text-xl mb-2 text-gray-800'>{feature.title}</h3>
                <p className='text-gray-600 text-sm'>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dekorativ bildremsa */}
      <div ref={collageRef} className='reveal-stagger grid grid-cols-2 md:grid-cols-4 h-64 md:h-96 w-full bg-white'>
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className='relative w-full h-full overflow-hidden group'>
            <img
              src={getImg(`collage-${num}.jpg`)}
              alt='Natur och miljö på Brogården'
              loading='lazy'
              className='w-full h-full object-cover md:will-change-transform md:scale-[1.08]'
            />
            <div className='absolute inset-0 group-hover:bg-black/10 transition-colors duration-300'></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
