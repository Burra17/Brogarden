import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';
import PageHero from '../components/PageHero';
import { galleryImages } from '../data/gallery';
import { getImg } from '../utils/imageHelper';
import { useScrollReveal, useScrollRevealList } from '../hooks/useScrollReveal';

const images = galleryImages.map((img) => ({ src: getImg(img.file), alt: img.alt }));

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Desktop: stagger-animation på hela gridet
  const gridRef = useScrollReveal<HTMLDivElement>();
  // Mobil: individuell reveal per bild
  const imageRef = useScrollRevealList({ activeClass: 'revealed-mobile' });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className='bg-white pb-20'>
      <PageHero
        title='Bildgalleri'
        subtitle='Se glimtar från vår vackra miljö, våra byggnader och livet på Brogården.'
        backgroundImage='gallery-hero.jpg'
      />

      <div className='container mx-auto px-4'>
        <div ref={gridRef} className='reveal-stagger-desktop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
          {images.map((img, index) => (
            <button
              type='button'
              key={img.src}
              ref={imageRef}
              className='gallery-reveal group relative block w-full aspect-square overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all'
              style={{ transitionDelay: `${Math.min(index * 60, 500)}ms` }}
              onClick={() => openLightbox(index)}
              aria-label={`Visa i helskärm: ${img.alt}`}
            >
              {/* Tom alt – knappens aria-label beskriver redan bilden */}
              <img
                src={img.src}
                alt=''
                loading='lazy'
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 group-focus-visible:bg-black/30 transition-colors flex items-center justify-center'>
                <ZoomIn
                  className='text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transform scale-50 group-hover:scale-100 group-focus-visible:scale-100 transition-all duration-300'
                  size={32}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox images={images} initialIndex={lightboxIndex} isOpen={isLightboxOpen} onClose={closeLightbox} />
    </div>
  );
};

export default Gallery;
