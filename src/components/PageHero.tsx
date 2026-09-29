import { getImg } from '../utils/imageHelper';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImage = 'default-hero.jpg' }) => {
  return (
    <section className='relative h-hero-page flex items-center justify-center mb-16'>
      {/* Bakgrundsbild */}
      <div className='absolute inset-0 overflow-hidden'>
        <img src={getImg(backgroundImage)} alt={title} fetchpriority='high' className='w-full h-full object-cover hero-ken-burns' />
        {/* Tunn svart hinna (30 %) så att vit text syns ovanpå ljusa bilder */}
        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      {/* Textinnehåll – pt-16 kompenserar för fixed header så texten inte överlappar */}
      <div className='relative z-10 text-center text-white px-4 pt-16'>
        <h1 className='text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg'>{title}</h1>
        {subtitle && <p className='text-xl max-w-xl mx-auto drop-shadow-md font-medium'>{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
