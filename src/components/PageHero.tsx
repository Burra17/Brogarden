import React from 'react';
import { getImg } from '../utils/imageHelper';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    backgroundImage = 'default-hero.jpg'
}) => {
    return (
        <section className="relative h-[40vh] flex items-center justify-center mb-16">
            {/* Bakgrundsbild */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={getImg(backgroundImage)}
                    onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/hero/1920/600'}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* En tunn svart hinna (30%) så att vit text syns ovanpå ljusa bilder. 
            Vill du ha bilden ännu ljusare kan du ändra till bg-black/10 eller ta bort raden helt. */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Textinnehåll */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl max-w-xl mx-auto opacity-100 drop-shadow-md font-medium">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
};

export default PageHero;