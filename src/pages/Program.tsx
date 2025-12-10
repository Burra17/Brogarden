import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';

const Program: React.FC = () => {
    return (
        // Jag tog bort 'pt-24' här för att bilden ska ligga kant-i-kant med toppen
        <div className="bg-brand-cream/30 min-h-screen pb-20">

            {/* --- HERO SEKTION --- */}
            <PageHero
                title="Program & Aktiviteter"
                subtitle="Här hittar du vad som händer på Brogården. Läger, gudstjänster och andra samlingar."
                backgroundImage="program-hero.jpg" // Se till att du har en bild med detta namn, annars visas en slumpmässig
            />

            <div className="container mx-auto px-4">
                {/* Den gamla rubriken låg här, men nu ligger den i bilden ovanför */}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Calendar Section */}
                    <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="text-brand-lightGreen" />
                            Kalender
                        </h2>
                        <div className="aspect-[4/3] w-full bg-gray-50 rounded-lg overflow-hidden">
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=c_cafb2e4b853878b7445efc043ac1c561419a4c70903456cb06bf4cfa3feb097c%40group.calendar.google.com&ctz=Europe%2FStockholm"
                                style={{ border: 0 }}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                title="Brogården Kalender"
                            ></iframe>
                        </div>
                    </div>

                    {/* Upcoming Highlights (Static Example) */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-6">Kommande höjdpunkter</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Valborg', date: '30 April', time: '11:00', desc: 'Vårsånger med Njutånger-Iggesundskyrkokör. Vårtal och servering. Varmt välkommen!' },
                                { title: 'Sommarläger', date: '11-13 Augusti', time: '12:00', desc: 'Välkommen till vårt populära sångläger för barn och unga! Vi sjunger, umgås och har roligt tillsammans.' },
                            ].map((event, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-lightGreen transition-colors group">
                                    <div className="flex items-center gap-3 text-brand-green font-semibold mb-2">
                                        <Calendar size={18} />
                                        <span>{event.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <Clock size={14} /> {event.time}
                                        <span className="mx-1">•</span>
                                        <MapPin size={14} /> Brogården
                                    </div>
                                    <p className="text-gray-600 text-sm">{event.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Program;