import { LucideIcon } from 'lucide-react';

export interface AccommodationFeature {
  icon: LucideIcon;
  label: string;
}

export interface AccommodationItem {
  id: string;
  title: string;
  description: string;
  type: 'Outdoor' | 'Room' | 'Cottage' | 'Venue';
  tags: { label: string; color: string }[];
  price: { amount: string; unit?: string }[];
  features: AccommodationFeature[];
  images: string[];
}
