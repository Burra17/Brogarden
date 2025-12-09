import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { getImg } from '../utils/imageHelper';

const Contact: React.FC = () => {
  return (
    <>
      <section className="relative h-[40vh] bg-brand-dark flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
           <img 
            src={getImg('contact-hero.jpg')}
            onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/contact/1920/600'}
            alt="Kontakt bakgrund" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Kontakta oss</h1>
          <p className="text-xl max-w-xl mx-auto opacity-90">Har du frågor eller vill boka? Hör gärna av dig!</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info Card */}
            <div className="bg-brand-cream rounded-2xl p-8 md:p-12 shadow-sm h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8">Kontaktuppgifter</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-white p-4 rounded-full shadow-sm text-brand-green mr-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-500 text-sm mb-1">Ring oss gärna</p>
                    <a href="tel:065070284" className="text-xl font-medium text-brand-green hover:underline">0650-70284</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-4 rounded-full shadow-sm text-brand-green mr-6">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">E-post</h3>
                    <p className="text-gray-500 text-sm mb-1">För bokning & frågor</p>
                    <a href="mailto:katarina.svedman@efs.nu" className="text-xl font-medium text-brand-green hover:underline break-all">katarina.svedman@efs.nu</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-4 rounded-full shadow-sm text-brand-green mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Adress</h3>
                    <p className="text-gray-500 text-sm mb-1">Besök oss</p>
                    <a href="https://maps.google.com/?q=Örängesvägen+19,+825+92+Njutånger" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-800 hover:text-brand-green transition-colors">
                      Örängesvägen 19,<br />825 92 Njutånger
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="mailto:katarina.svedman@efs.nu?subject=Bokningsförfrågan Brogården" 
                  className="w-full block text-center bg-brand-green text-white font-bold py-4 rounded-lg shadow-md hover:bg-brand-dark transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Skicka bokningsförfrågan
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-md border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d670.8238309460805!2d17.05760210743399!3d61.60453610011577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4666a56245e8a553%3A0xdacf9e633bf295!2sBrog%C3%A5rden!5e0!3m2!1ssv!2sse!4v1765299227222!5m2!1ssv!2sse"
                height="100%"
                style={{border: 0}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Karta över Njutånger"
                className="w-full h-full"
              >
              </iframe>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;