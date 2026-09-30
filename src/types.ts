import type { ComponentType } from 'react';
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

// En bild i lightboxen – alt-texten läses upp av skärmläsare
export interface LightboxImage {
  src: string;
  alt: string;
}

export interface Highlight {
  title: string;
  text: string;
  date?: string;
  time?: string;
  // Både Lucide-ikoner och egna varumärkesikoner (t.ex. InstagramIcon) passar – båda tar emot size
  link?: { label: string; url: string; icon?: ComponentType<{ size?: number }> };
}
