import {
    Zap,
    Droplets,
    Home,
    Bed,
    Users,
    Utensils,
    ShowerHead,
    Music,
    Mic,
} from 'lucide-react';
import { AccommodationItem } from '../types';
import { getImg } from '../utils/imageHelper';

export const accommodations: AccommodationItem[] = [
    // Outdoors
    {
        id: 'camping',
        title: 'Ställplats för husvagn/bil och tält.',
        description: 'Vacker utemiljö med grönytor, närhet till vatten och flera sittplatser runt området. Perfekt för avkoppling, grillning eller lek för barnen.',
        type: 'Outdoor',
        tags: [{ label: 'Natur', color: 'bg-green-100 text-green-800' }],
        price: [
            { amount: '200 kr', unit: '/ natt (Husvagn/bil)' },
            { amount: '150 kr', unit: '/ natt (Tält)' }
        ],
        features: [
            { icon: Zap, label: 'Elstolpe' },
            { icon: Droplets, label: 'Vatten' },
            { icon: Home, label: 'Huvudbyggnad' }
        ],
        images: [
            getImg('camping-detail-1.jpg'),
            getImg('camping-detail-2.jpg')
        ]
    },
    // Rooms
    {
        id: 'blarummet',
        title: 'Blå rummet',
        description: 'Ett trevligt dubbelrum i södra gaveln av Kyrkbyggnaden.',
        type: 'Room',
        tags: [{ label: 'Rum', color: 'bg-blue-100 text-blue-800' }],
        price: [{ amount: '200 kr', unit: '/ natt' }],
        features: [
            { icon: Users, label: 'Toalett intill' },
            { icon: ShowerHead, label: 'Gemensam dusch i huvudbyggnad' },
            { icon: Home, label: 'Tillgång till kök i huvudbyggnad' }
        ],
        images: [getImg('room-blue.jpg')]
    },
    {
        id: 'solorummet',
        title: 'Solorummet',
        description: 'Ett litet rum i södra gaveln av kyrkobyggnaden med närhet till toalett.',
        type: 'Room',
        tags: [{ label: 'Rum', color: 'bg-blue-100 text-blue-800' }],
        price: [{ amount: '200 kr', unit: '/ natt' }],
        features: [
            { icon: Users, label: 'Toalett intill' },
            { icon: ShowerHead, label: 'Gemensam dusch i huvudbyggnad' },
            { icon: Home, label: 'Tillgång till kök i huvudbyggnad' }
        ],
        images: [getImg('room-solo.jpg')]
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
        description: 'Mysig mindre stuga med fyra bäddar i våningssängar. Här får även hunden sova över.',
        type: 'Cottage',
        tags: [{ label: 'Stuga', color: 'bg-red-100 text-red-800' }],
        price: [{ amount: '500 kr', unit: '/ natt' }],
        features: [
            { icon: Bed, label: '4 Bäddar' },
            { icon: ShowerHead, label: 'WC/dusch i huvudbyggnad' },
            { icon: Utensils, label: 'Kök i huvudbyggnad' }
        ],
        images: [
            getImg('stuga-lillstugan-1.jpg'),
            getImg('stuga-lillstugan-2.jpg')
        ]
    },
    {
        id: 'osterstugan',
        title: 'Österstugan',
        description: 'Vårt största boende med tre sovrum och ett sällskapsrum.',
        type: 'Cottage',
        tags: [{ label: 'Stort hus', color: 'bg-red-100 text-red-800' }],
        price: [
            { amount: '800 kr', unit: '/ hela huset' },
            { amount: '400 kr', unit: '/ rum' },
            { amount: '150 kr', unit: '/ bädd' }
        ],
        features: [
            { icon: Users, label: '1–8 Bäddar' },
            { icon: Home, label: 'Sällskapsrum' },
            { icon: Bed, label: '3 Sovrum' },
            { icon: Utensils, label: 'Kök i huvudbyggnad' },
            { icon: ShowerHead, label: 'WC/dusch i huvudbyggnad' }
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
        title: 'Kyrksal/Samlingssal',
        description: 'Flexibel samlingssal för gudstjänster, föredrag, sång och musik etc. Utrustad med 80 lösa stolar, elpiano och ljudanläggning.',
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
    },
    // Huvudbyggnad
    {
        id: 'huvudbyggnad',
        title: 'Huvudbyggnaden',
        description: 'När du bor på Brogården får du tillgång till den gemensamma huvudbyggnaden. Här finns ett stort kök med grundläggande utrustning. Matsal för ca 40 personer och även matplatser utomhus.',
        type: 'Venue',
        tags: [{ label: 'Gemensamma utrymmen', color: 'bg-amber-100 text-amber-800' }],
        price: [{ amount: 'Ingår', unit: 'för gäster' }],
        features: [
            { icon: Users, label: '4 st WC (2 per plan)' },
            { icon: ShowerHead, label: '2 st Duschar (1 per plan)' },
            { icon: Utensils, label: 'Matsal 40 personer' },
            { icon: Home, label: 'Kök med kyl, frys, spisar, diskmaskin, micro, kaffebryggare.' }
        ],
        images: [
            getImg('main-building-reception.jpg'),
            getImg('main-building-dining.jpg')
        ]
    }
];
