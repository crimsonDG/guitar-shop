export interface Guitar {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  imageUrl: string;
  category: GuitarCategory;
  specifications: GuitarSpecs;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export type GuitarCategory = 'acoustic' | 'electric' | 'classical' | 'bass';

export interface GuitarSpecs {
  bodyMaterial: string;
  neckMaterial: string;
  fingerboard: string;
  pickups?: string;
  strings: number;
  scale: string;
}

export interface CartItem {
  guitar: Guitar;
  quantity: number;
}