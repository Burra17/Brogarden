import React, { useState } from 'react';
import {
    Zap,
    Droplets,
    Home,
    Bed,
    Users,
    Utensils,
    ShowerHead,
    Trees,
    Music,
    Mic,
    CalendarCheck,
    Images
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageLightbox from '../components/ImageLightbox';
import PageHero from '../components/PageHero'; // <--- Vi använder din nya komponent
import { getImg } from '../utils/imageHelper';

// Vi definierar typen här för säkerhets skull så att koden fungerar direkt
interface AccommodationItem {
    id: string;
    title: string;
    description: string;
    type: 'Outdoor' | 'Room' | 'Cottage' | 'Venue';
    tags: { label: string; color: string }[];
    price: { amount: string; unit?: string }[];
    features: { icon: React.ElementType; label: string }[];
    images: string[];
}

const accommodations: AccommodationItem[] = [
    // Outdoors
    {
        id: 'camping',
        title: 'Camping & Tältplats',
        description: 'Vacker utemiljö med gröna ytor, närhet till vattnet och flera sittplatser runt området. Perfekt för avkoppling, grillning eller lek för barnen.',
        type: 'Outdoor',
        tags: [{ label: 'Natur', color: 'bg-green-100 text-green-800' }],
        price: [
            { amount: '200 kr', unit: '/ natt (Husbil)' },
            { amount: '150 kr', unit: '/ natt (Tält)' }
        ],
        features: [
            { icon: Zap, label: 'Elstolpe' },
            { icon: Droplets, label: 'Vatten' },
            { icon: Home, label: 'Servicehus' }
        ],
        images: [
            getImg('camping-main.jpg'),
            getImg('camping-detail-1.jpg'),
            getImg('camping-detail-2.jpg')
        ]
    },
    // Rooms
    {
        id: 'rooms',
        title: 'Blårummet & Solorummet',
        description: 'Våra trevliga rum inne i huvudbyggnaden. Perfekt för dig som vill ha nära till kök och sällskapsytor.',
        type: 'Room',
        tags: [{ label: 'Rum', color: 'bg-blue-100 text-blue-800' }],
        price: [
            { amount: '400 kr', unit: 'Blårummet' },
            { amount: '300 kr', unit: 'Solorummet' }
        ],
        features: [
            { icon: Users, label: 'Toalett intill' },
            { icon: ShowerHead, label: 'Gemensam dusch' },
            { icon: Utensils, label: 'Tillgång till kök' }
        ],
        images: [
            getImg('room-blue.jpg'),
            getImg('room-solo.jpg'),
            getImg('room-kitchen.jpg')
        ]
    },
    // Cottages
    {
        id: 'nystugan',
        title: 'Nystugan',
        description: 'En rymlig stuga med veranda. Här finns plats för hela familjen med våningssängar och enkelsäng.',
        type: 'Cottage',
        tags: [{ label: 'Stuga', color: 'bg-red-100 text-red-800' }],
        price: [{ amount: '600 kr', unit: '/ natt' }],
        features: [
            { icon: Bed, label: '5 Bäddar' },
            { icon: Trees, label: 'Veranda' },
            { icon: Utensils, label: 'Kök i huvudbyggnad' }
        ],
        images: [
            getImg('stuga-nystugan-1.jpg'),
            getImg('stuga-nystugan-2.jpg'),
            getImg('stuga-nystugan-3.jpg'),
            getImg('stuga-nystugan-4.jpg')
        ]
    },
    {
        id: 'lillstugan',
        title: 'Lillstugan',
        description: 'Mysig mindre stuga med fyra bäddar i våningssängar. Perfekt för det lilla sällskapet.',
        type: 'Cottage',
        tags: [{ label: 'Stuga', color: 'bg-red-100 text-red-800' }],
        price: [{ amount: '500 kr', unit: '/ natt' }],
        features: [
            { icon: Bed, label: '4 Bäddar' },
            { icon: ShowerHead, label: 'Servicehus nära' }
        ],
        images: [
            getImg('stuga-lillstugan-1.jpg'),
            getImg('stuga-lillstugan-2.jpg')
        ]
    },
    {
        id: 'osterstugan',
        title: 'Österstugan',
        description: 'Vårt största boende med tre sovrum och ett sällskapsrum. Passar utmärkt för större sällskap eller konferensgrupper.',
        type: 'Cottage',
        tags: [{ label: 'Stort hus', color: 'bg-red-100 text-red-800' }],
        price: [
            { amount: '800 kr', unit: '/ hela huset' },
            { amount: '400 kr', unit: '/ rum' }
        ],
        features: [
            { icon: Users, label: '1–8 Bäddar' },
            { icon: Home, label: 'Sällskapsrum' },
            { icon: Bed, label: '3 Sovrum' }
        ],
        images: [
            getImg('stuga-osterstugan-1.jpg'),
            getImg('stuga-osterstugan-2.jpg'),
            getImg('stuga-osterstugan-3.jpg'),
            getImg('stuga-osterstugan-4.jpg'),
            getImg('stuga-osterstugan-5.jpg')
        ]
    },
    // Venue
    {
        id: 'kyrksal',
        title: 'Kyrksal & Samlingssal',
        description: 'Flexibel samlingssal för konferens, gudstjänst eller fest. Utrustad med elpiano och ljudanläggning.',
        type: 'Venue',
        tags: [{ label: 'Lokal', color: 'bg-gray-100 text-gray-800' }],
        price: [{ amount: 'Kontakta oss', unit: 'för pris' }],
        features: [
            { icon: Users, label: 'ca 80 platser' },
            { icon: Music, label: 'Elpiano' },
            { icon: Mic, label: 'Ljudsystem' }
        ],
        images: [
            getImg('venue-kyrksal-1.jpg'),
            getImg('venue-kyrksal-2.jpg')
        ]
    }
];

interface AccommodationCardProps {
    item: AccommodationItem;
    reverse?: boolean;
    onOpenGallery: (images: string[]) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ item, reverse, onOpenGallery }) => {
    return (
        <div className={`flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-12 lg:mb-20 transition-all hover:shadow-xl ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Gallery */}
            <div
                className="lg:w-1/2 h-64 lg:h-auto relative group cursor-pointer"
                onClick={() => onOpenGallery(item.images)}
            >
                <img
                    src={item.images[0]}
                    onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/${item.id}/1200/800`;
                    }}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-40"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/40 p-3 rounded-full backdrop-blur-sm text-white border border-white/30">
                        <Images size={32} />
                    </div>
                </div>

                {item.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                        <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5">
                            <Images size={12} />
                            +{item.images.length - 1} bilder
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                    {item.tags.map((tag, idx) => (
                        <span key={idx} className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${tag.color}`}>
                            {tag.label}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold font-serif mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Faciliteter</h4>
                    <ul className="grid grid-cols-2 gap-y-2">
                        {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-700 text-sm">
                                <feature.icon size={16} className="text-brand-lightGreen mr-2" />
                                {feature.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col">
                        {item.price.map((p, idx) => (
                            <div key={idx} className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-brand-green">{p.amount}</span>
                                {p.unit && <span className="text-sm text-gray-500">{p.unit}</span>}
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/kontakt"
                        className="px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-dark transition-colors font-medium flex items-center gap-2"
                    >
                        <CalendarCheck size={18} />
                        {item.type === 'Venue' ? 'Gör förfrågan' : 'Boka nu'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

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

            {/* --- HERO SEKTION (Ny enhetlig topp) --- */}
            <PageHero
                title="Bo hos oss"
                subtitle="Från mysiga stugor till natursköna tältplatser."
                backgroundImage="camping-main.jpg"
            />

            {/* Main List */}
            <div className="container mx-auto px-4 py-20">

                {/* Filter/Categories Header */}
                <div className="text-center mb-16">
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