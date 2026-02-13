import { useState } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import PageHero from '../components/PageHero';
import AccommodationCard from '../components/AccommodationCard';
import { accommodations } from '../data/accommodations';

const Accommodation: React.FC = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);

    const handleOpenGallery = (images: string[]) => {
        setCurrentGalleryImages(images);
        setLightboxOpen(true);
    };

    const handleCloseGallery = () => {
        setLightboxOpen(false);
    };

    return (
        <div className="bg-brand-cream/30 min-h-screen">
            <PageHero
                title="Bo hos oss"
                subtitle="Prisvärt och flexibelt boende för små och stora sällskap."
                backgroundImage="camping-main.jpg"
            />

            <div className="container mx-auto px-4 pb-20 -mt-12">
                <div className="text-center mb-5">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Våra boendealternativ</h2>
                    <div className="w-16 h-1 bg-brand-lightGreen mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-500">Klicka på bilderna för att se fler foton</p>
                </div>

                {accommodations.map((item, index) => (
                    <AccommodationCard
                        key={item.id}
                        item={item}
                        reverse={index % 2 !== 0}
                        onOpenGallery={handleOpenGallery}
                    />
                ))}
            </div>

            <ImageLightbox
                images={currentGalleryImages}
                initialIndex={0}
                isOpen={lightboxOpen}
                onClose={handleCloseGallery}
            />
        </div>
    );
};

export default Accommodation;
