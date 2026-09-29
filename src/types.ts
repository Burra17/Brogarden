import { LucideIcon } from 'lucide-react';

// Färgton för etiketter – komponenten som visar etiketten väljer de faktiska klasserna
export type Tone = 'green' | 'blue' | 'red' | 'gray' | 'amber';

export interface AccommodationFeature {
  icon: LucideIcon;
  label: string;
}

export interface AccommodationItem {
  id: string;
  title: string;
  description: string;
  type: 'Outdoor' | 'Room' | 'Cottage' | 'Venue';
  tags: { label: string; tone: Tone }[];
  price: { amount: string; unit?: string }[];
  features: AccommodationFeature[];
  images: string[];
}

export interface AboutFeature {
  icon: LucideIcon;
  title: string;
  text: string;
  tone: Extract<Tone, 'green' | 'blue' | 'red'>;
}

export interface Highlight {
  title: string;
  text: string;
  date?: string;
  time?: string;
  link?: { label: string; url: string; icon?: LucideIcon };
}
