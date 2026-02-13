import { Link } from 'react-router-dom';
import { Images, CalendarCheck } from 'lucide-react';
import { AccommodationItem } from '../types';

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
                    loading="lazy"
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

export default AccommodationCard;
