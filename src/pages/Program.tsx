import React, { useEffect } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import { useScrollReveal } from "../utils/useScrollReveal";

const Program: React.FC = () => {
  useEffect(() => {
    document.title = "Program & Aktiviteter – Brogården";
  }, []);
  const calendarRef = useScrollReveal<HTMLDivElement>();
  const highlightsRef = useScrollReveal<HTMLDivElement>();
  const eventsRef = useScrollReveal<HTMLDivElement>();

  return (
    // Jag tog bort 'pt-24' här för att bilden ska ligga kant-i-kant med toppen
    <div className="bg-brand-cream/30 pb-20">
      {/* --- HERO SEKTION --- */}
      <PageHero
        title="Program & Aktiviteter"
        subtitle="Här hittar du vad som händer på Brogården. Läger, gudstjänster och andra samlingar."
        backgroundImage="program-hero.jpg" // Se till att du har en bild med detta namn, annars visas en slumpmässig
      />

      <div className="container mx-auto px-4">
        {/* Den gamla rubriken låg här, men nu ligger den i bilden ovanför */}

        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          {/* Calendar Section */}
          <div
            ref={calendarRef}
            className="reveal-fade-up w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-brand-lightGreen" />
              Kalender
            </h2>
            <div className="aspect-square md:aspect-[4/3] w-full bg-gray-50 rounded-lg overflow-hidden">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=c_cafb2e4b853878b7445efc043ac1c561419a4c70903456cb06bf4cfa3feb097c%40group.calendar.google.com&ctz=Europe%2FStockholm&mode=AGENDA"
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
          <div
            ref={highlightsRef}
            className="reveal-fade-up w-full lg:w-1/3"
            style={{ transitionDelay: "150ms" }}
          >
            <h2 className="text-2xl font-bold mb-6">Kommande höjdpunkter</h2>
            <div ref={eventsRef} className="reveal-stagger space-y-4">
              {[
                {
                  title: "Surströmmingsavslutning",
                  date: "Söndag 30 Augusti 2026",
                  time: "18:00",
                  desc: (
                    <>
                      Anmälan{" "}
                      <a
                        href="tel:+46738569436"
                        className="text-brand-green font-semibold underline"
                      >
                        073-856 94 36
                      </a>
                    </>
                  ),
                },
                {
                  title: "Tack till alla gäster som besökt oss i sommar!",
                  date: null,
                  time: null,
                  desc: "Logigäster, lägerdeltagare, gudstjänst- och musikkvällsdeltagare, eller besökare vid andra evenemang. Det är ni som bidrar till att Brogården kan fortsätta fungera som en värdefull kristen mötesplats för alla generationer. Hoppas vi ses nästa sommar igen!",
                },
              ].map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-lightGreen transition-colors group"
                >
                  {event.date && (
                    <div className="flex items-center gap-3 text-brand-green font-semibold mb-2">
                      <Calendar size={18} />
                      <span>{event.date}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">
                    {event.title}
                  </h3>
                  {event.time && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock size={14} /> {event.time}
                      <span className="mx-1">•</span>
                      <MapPin size={14} /> Brogården
                    </div>
                  )}
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
