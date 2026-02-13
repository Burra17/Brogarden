import { Link } from 'react-router-dom';
import { ArrowRight, Trees, Home as HomeIcon, Heart } from 'lucide-react';
import { getImg } from '../utils/imageHelper';

const Home: React.FC = () => {
    return (
        <>
            {/* Hero Section - Matchar bilden perfekt */}
            <section className="relative h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                {/* Bakgrundsbild utan mörkt lager */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImg('home-hero.jpg')}
                        onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/brogardenhero/1920/1080'}
                        alt="Brogården natur"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Innehåll */}
                <div className="relative z-10 container mx-auto px-6 text-center text-white pt-16 md:pt-0">
                    {/* Rubrik med mjuk men djup skugga för läsbarhet mot ljus himmel */}
                    <h1 className="text-4xl md:text-7xl font-bold font-serif mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-tight">
                        Välkommen till Brogården!
                    </h1>

                    {/* Beskrivning */}
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        Lägergård, vandrarhem och EFS-kyrka i lugn och naturskön miljö nära havet. En plats för vila, gemenskap och glädje.
                    </p>

                    {/* Knappar som på bilden */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Solid grön knapp */}
                        <Link
                            to="/boende"
                            className="w-full sm:w-auto px-8 py-4 bg-[#7FB346] hover:bg-[#6e9c3d] text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            Se våra rum & stugor <ArrowRight size={20} />
                        </Link>

                        {/* "Glass"-knapp: Halvgenomskinlig med suddig bakgrund */}
                        <Link
                            to="/kontakt"
                            className="w-full sm:w-auto px-10 py-4 bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/35 text-white font-semibold rounded-full transition-all shadow-lg flex items-center justify-center transform hover:scale-105"
                        >
                            Kontakta oss
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <span className="text-[#4A6741] font-bold tracking-wider uppercase text-sm mb-2 block">Om Oss</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">En plats för möten</h2>
                    <div className="w-24 h-1 bg-[#7FB346] mx-auto mb-10 rounded-full"></div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        Brogården drivs ideellt av en lokal, kristen EFS-förening. Här erbjuds prisvärt boende i rum och stugor samt ställplatser för husbil och tält. Gården används även för läger, dop, bröllop, föreningsdagar och gudstjänster.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-96 w-full">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="relative w-full h-full overflow-hidden group">
                        <img
                            src={getImg(`collage-${num}.jpg`)}
                            onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/camp${num}/800/800`}
                            alt="Natur och miljö på Brogården"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;