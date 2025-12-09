import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';

// Helper to get correct path regardless of deployment
const getImg = (path: string) => {
  const meta = import.meta as any;
  const baseUrl = meta.env?.BASE_URL ?? '/';
  return `${baseUrl}images/${path}`;
};

const images = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  url: getImg(`gallery-${i + 1}.jpg`),
  caption: `Brogården miljö ${i + 1}`
}));

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Bildgalleri</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Se glimtar från vår vackra miljö, våra byggnader och livet på Brogården.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={img.url} 
                onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/brogarden${index}/1200/800`}
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageLightbox 
        images={images.map(img => img.url)}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default Gallery;