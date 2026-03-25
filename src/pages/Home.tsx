import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trees, Home as HomeIcon, Heart } from 'lucide-react';
import { getImg } from '../utils/imageHelper';
import { useScrollReveal } from '../utils/useScrollReveal';

const Home: React.FC = () => {
    // Scroll reveal refs för sektioner under the fold
    const aboutRef = useScrollReveal<HTMLElement>();
    const cardsRef = useScrollReveal<HTMLDivElement>();
    const collageRef = useScrollReveal<HTMLDivElement>();
    // Parallax-effekt på collage – bilderna rör sig långsammare än scrollen
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

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
    }, []);

    return (
        <>
            {/* Hero Section - Matchar bilden perfekt */}
            <section className="relative h-hero-home flex items-center justify-center overflow-hidden">
                {/* Bakgrundsbild utan mörkt lager */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImg('home-hero.jpg')}
                        onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/brogardenhero/1920/1080'}
                        alt="Brogården natur"
                        fetchPriority="high"
                        className="w-full h-full object-cover hero-ken-burns"
                    />
                </div>

                {/* Innehåll */}
                <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20 pb-12 md:py-0">
                    {/* Rubrik med mjuk men djup skugga för läsbarhet mot ljus himmel */}
                    <h1 className="hero-animate text-3xl md:text-7xl font-bold font-serif mb-4 md:mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-tight">
                        Välkommen till Brogården!
                    </h1>

                    {/* Beskrivning */}
                    <p className="hero-animate hero-delay-1 text-base md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        Lägergård, vandrarhem och EFS-kyrka i lugn och naturskön miljö nära havet. En plats för vila, gemenskap och glädje.
                    </p>

                    {/* Knappar – använder hero-animate-buttons som inte ändrar opacity */}
                    <div className="hero-animate-buttons flex flex-col gap-3 md:gap-4 justify-center items-center w-full max-w-xs mx-auto sm:max-w-none">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full">
                            <Link
                                to="/boende"
                                className="w-full sm:w-auto px-6 py-2.5 md:px-10 md:py-4 text-sm md:text-base bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/35 text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Se våra rum & stugor <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/program"
                                className="w-full sm:w-auto px-6 py-2.5 md:px-10 md:py-4 text-sm md:text-base bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/35 text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Program <ArrowRight size={18} />
                            </Link>
                        </div>
                        <Link
                            to="/kontakt"
                            className="w-full sm:w-auto px-6 py-2.5 md:px-10 md:py-4 text-sm md:text-base bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/35 text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Kontakta oss
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="reveal-fade-up py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <span className="text-[#4A6741] font-bold tracking-wider uppercase text-sm mb-2 block">Om Oss</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">En plats för möten</h2>
                    <div className="w-24 h-1 bg-[#7FB346] mx-auto mb-10 rounded-full"></div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        Brogården drivs ideellt av en lokal, kristen EFS-förening. Här erbjuds prisvärt boende i rum och stugor samt ställplatser för husbil och tält. Gården används även för läger, dop, bröllop, föreningsdagar och gudstjänster.
                    </p>

                    <div ref={cardsRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-[#fcfaf7] rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-[#7FB346]/10 text-[#7FB346] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trees size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">Naturnära</h3>
                            <p className="text-gray-600 text-sm">Omgiven av skog och vatten, perfekt för återhämtning.</p>
                        </div>
                        <div className="p-6 bg-[#fcfaf7] rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HomeIcon size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">Hemtrevligt</h3>
                            <p className="text-gray-600 text-sm">Enkla, mysiga rum och stugor med personlig touch.</p>
                        </div>
                        <div className="p-6 bg-[#fcfaf7] rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">Gemenskap</h3>
                            <p className="text-gray-600 text-sm">En mötesplats för alla åldrar, driven av ideella krafter.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative Image Strip */}
            <div ref={collageRef} className="reveal-stagger grid grid-cols-2 md:grid-cols-4 h-64 md:h-96 w-full">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="relative w-full h-full overflow-hidden group">
                        <img
                            src={getImg(`collage-${num}.jpg`)}
                            onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/camp${num}/800/800`}
                            alt="Natur och miljö på Brogården"
                            loading="lazy"
                            className="w-full h-full object-cover will-change-transform scale-[1.08]"
                        />
                        <div className="absolute inset-0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;