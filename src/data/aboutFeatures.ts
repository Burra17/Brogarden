import { Trees, Home, Heart } from 'lucide-react';
import { AboutFeature } from '../types';

// Korten under "Om oss" på startsidan
export const aboutFeatures: AboutFeature[] = [
  {
    icon: Trees,
    title: 'Naturnära',
    text: 'Omgiven av skog och vatten, perfekt för återhämtning.',
    tone: 'green',
  },
  {
    icon: Home,
    title: 'Hemtrevligt',
    text: 'Enkla, mysiga rum och stugor med personlig touch.',
    tone: 'blue',
  },
  {
    icon: Heart,
    title: 'Gemenskap',
    text: 'En mötesplats för alla åldrar, driven av ideella krafter.',
    tone: 'red',
  },
];
