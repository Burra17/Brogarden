import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { highlights } from '../data/highlights';

const Program: React.FC = () => {
  const calendarRef = useScrollReveal<HTMLDivElement>();
  const highlightsRef = useScrollReveal<HTMLDivElement>();
  const eventsRef = useScrollReveal<HTMLDivElement>();
  const hasHighlights = highlights.length > 0;

  return (
    <div className='bg-brand-cream/30 pb-20'>
      {/* --- HERO SEKTION --- */}
      <PageHero
        title='Program & Aktiviteter'
        subtitle='Här hittar du vad som händer på Brogården. Läger, gudstjänster och andra samlingar.'
        backgroundImage='program-hero.jpg'
      />

      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row lg:items-start gap-12'>
          {/* Kalender */}
          <div
            ref={calendarRef}
            className={`reveal-fade-up w-full ${hasHighlights ? 'lg:w-2/3' : ''} bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden p-6`}
          >
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
              <Calendar className='text-brand-lightGreen' />
              Kalender
            </h2>
            <div className='aspect-square md:aspect-4/3 w-full bg-gray-50 rounded-lg overflow-hidden'>
              <iframe
                src='https://calendar.google.com/calendar/embed?src=c_cafb2e4b853878b7445efc043ac1c561419a4c70903456cb06bf4cfa3feb097c%40group.calendar.google.com&ctz=Europe%2FStockholm&mode=AGENDA'
                style={{ border: 0 }}
                width='100%'
                height='100%'
                frameBorder='0'
                scrolling='no'
                title='Brogården Kalender'
              ></iframe>
            </div>
          </div>

          {/* Kommande höjdpunkter – döljs när listan är tom */}
          {hasHighlights && (
            <div ref={highlightsRef} className='reveal-fade-up w-full lg:w-1/3' style={{ transitionDelay: '150ms' }}>
              <h2 className='text-2xl font-bold mb-6'>Kommande höjdpunkter</h2>
              <div ref={eventsRef} className='reveal-stagger space-y-4'>
                {highlights.map((event) => (
                  <div
                    key={event.title}
                    className='bg-white p-6 rounded-xl shadow-xs border border-gray-100 hover:border-brand-lightGreen transition-colors group'
                  >
                    {event.date && (
                      <div className='flex items-center gap-3 text-brand-green font-semibold mb-2'>
                        <Calendar size={18} />
                        <span>{event.date}</span>
                      </div>
                    )}
                    <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors'>{event.title}</h3>
                    {event.time && (
                      <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                        <Clock size={14} /> {event.time}
                        <span className='mx-1'>•</span>
                        <MapPin size={14} /> Brogården
                      </div>
                    )}
                    <p className='text-gray-600 text-sm'>
                      {event.text}
                      {event.link && (
                        <>
                          {' '}
                          <a
                            href={event.link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-brand-green font-semibold underline'
                          >
                            {event.link.icon && <event.link.icon size={14} />} {event.link.label}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Program;
