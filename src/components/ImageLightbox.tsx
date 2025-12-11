import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // State för att hantera swipe
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50; // Minsta avstånd (px) för att räknas som swipe

    // Reset index when opening new set of images
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const showPrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const showNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // --- SWIPE LOGIK ---
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            showNext();
        }
        if (isRightSwipe) {
            showPrev();
        }
    };
    // -------------------

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fade-in"
            onClick={onClose}
            // Lägg till touch-lyssnare på containern
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <button
                className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors p-2 z-50 focus:outline-none"
                onClick={onClose}
                aria-label="Stäng"
            >
                <X size={40} />
            </button>

            {images.length > 1 && (
                <>
                    {/* Vänster pil: Uppdaterad styling för mobil */}
                    <button
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white p-4 bg-black/20 hover:bg-black/40 rounded-full transition-all focus:outline-none z-50"
                        onClick={showPrev}
                        aria-label="Föregående bild"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    {/* Höger pil: Uppdaterad styling för mobil */}
                    <button
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white p-4 bg-black/20 hover:bg-black/40 rounded-full transition-all focus:outline-none z-50"
                        onClick={showNext}
                        aria-label="Nästa bild"
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}

            <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center pointer-events-none">
                <img
                    src={images[currentIndex]}
                    alt={`Bild ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain shadow-2xl pointer-events-auto rounded-sm select-none" // select-none förhindrar att bilden markeras vid swipe
                    onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute bottom-[-2rem] md:bottom-4 left-0 right-0 text-center text-white/80 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;