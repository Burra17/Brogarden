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
