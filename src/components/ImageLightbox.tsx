import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LightboxImage } from '../types';

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

// Bildvisning i helskärm. Byggd på webbläsarens <dialog> med showModal(), som ger
// fokusfälla, stängning med Escape, fokus tillbaka till knappen som öppnade den
// och en otillgänglig bakgrund. Dialogen ligger i webbläsarens top layer, ovanför
// headern och allt annat, så ingen z-index eller döljning av andra element behövs.
const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // State för att hantera swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Återställ index när lightboxen öppnas eller startbilden byts. Justeras under
  // renderingen i stället för i en effect, så att fel bild aldrig hinner visas.
  const [prevProps, setPrevProps] = useState({ isOpen, initialIndex });
  if (prevProps.isOpen !== isOpen || prevProps.initialIndex !== initialIndex) {
    setPrevProps({ isOpen, initialIndex });
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Synka dialogen med isOpen och lås sidans scroll medan den är öppen
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Fokusera dialogen i stället för första knappen, så att fokusringen inte
      // visas vid öppning med mus. Tab går vidare till knapparna som vanligt.
      dialog.focus();
    }
    if (!isOpen && dialog.open) dialog.close();

    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Piltangenter bläddrar. Escape hanteras av <dialog> och utlöser onClose via close-händelsen.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  };

  // Klick utanför bilden och knapparna träffar själva dialogen och stänger den
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
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
    if (distance > minSwipeDistance) showNext();
    if (distance < -minSwipeDistance) showPrev();
  };

  const currentImage = images[currentIndex];

  return (
    // jsx-a11y räknar <dialog> som icke-interaktivt. Klick på bakgrunden är en genväg för
    // mus/touch – tangentbordet har Escape och Stäng-knappen – och piltangenterna måste
    // lyssnas på här eftersom fokus ligger i dialogen.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-label='Bildvisning'
      tabIndex={-1}
      className='fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-black/95 p-4 outline-none backdrop:bg-black/95 open:flex items-center justify-center animate-fade-in'
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        type='button'
        className='absolute top-4 right-4 text-white active:text-white/60 md:hover:text-white/80 transition-colors p-3 z-10'
        onClick={onClose}
        aria-label='Stäng'
      >
        <X size={40} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type='button'
            className='absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white p-3 md:p-4 bg-black/20 active:bg-black/50 md:hover:bg-black/40 rounded-full transition-all z-10'
            onClick={showPrev}
            aria-label='Föregående bild'
          >
            <ChevronLeft size={28} className='md:hidden' />
            <ChevronLeft size={48} className='hidden md:block' />
          </button>

          <button
            type='button'
            className='absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white p-3 md:p-4 bg-black/20 active:bg-black/50 md:hover:bg-black/40 rounded-full transition-all z-10'
            onClick={showNext}
            aria-label='Nästa bild'
          >
            <ChevronRight size={28} className='md:hidden' />
            <ChevronRight size={48} className='hidden md:block' />
          </button>
        </>
      )}

      {currentImage && (
        <div className='relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center pointer-events-none'>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className='max-w-full max-h-[85vh] md:max-h-[90vh] object-contain shadow-2xl pointer-events-auto rounded-sm select-none'
          />
          {/* Läses upp av skärmläsare vid varje bildbyte */}
          <div aria-live='polite' className='absolute bottom-2 md:bottom-4 left-0 right-0 text-center text-white/80 text-sm font-medium'>
            <span aria-hidden='true'>
              {currentIndex + 1} / {images.length}
            </span>
            <span className='sr-only'>
              Bild {currentIndex + 1} av {images.length}
            </span>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default ImageLightbox;
