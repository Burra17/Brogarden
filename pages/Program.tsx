import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Program: React.FC = () => {
  return (
    <div className="bg-brand-cream/30 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Program & Aktiviteter</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Här hittar du vad som händer på Brogården. Läger, gudstjänster och andra samlingar.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Calendar Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-brand-lightGreen" />
              Kalender
            </h2>
            <div className="aspect-[4/3] w-full bg-gray-50 rounded-lg overflow-hidden">
              {/* Embedding a public holiday calendar as placeholder since no specific ID was provided */}
              <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FStockholm&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=c3Yuc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043" 
                style={{border: 0}} 
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
                { title: 'Sommarläger', date: '15-20 Juli', time: 'Hela veckan', desc: 'Läger för barn 10-14 år. Lek, bad och bibel.' },
                { title: 'Friluftsgudstjänst', date: '28 Juli', time: '11:00', desc: 'Vi firar gudstjänst nere vid vattnet. Ta med kaffekorg.' },
                { title: 'Arbetsdag', date: '24 Aug', time: '09:00 - 15:00', desc: 'Vi hjälps åt att fixa inför hösten. Korvgrillning ingår.' },
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