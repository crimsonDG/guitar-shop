import type { Guitar } from '../types/guitar';

export const mockGuitars: Guitar[] = [
  {
    id: '1',
    name: 'Fender Stratocaster American Professional II',
    brand: 'Fender',
    model: 'Stratocaster',
    price: 1899,
    description: 'Професійна електрогітара з класичним звучанням Fender',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'electric',
    specifications: {
      bodyMaterial: 'Alder',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '3 V-Mod II Single-Coil',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: '2',
    name: 'Gibson Les Paul Standard 50s',
    brand: 'Gibson',
    model: 'Les Paul',
    price: 2799,
    description: 'Легендарна електрогітара з потужним роковим звучанням',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    category: 'electric',
    specifications: {
      bodyMaterial: 'Mahogany',
      neckMaterial: 'Mahogany',
      fingerboard: 'Rosewood',
      pickups: '2 Burstbucker 61',
      strings: 6,
      scale: '24.75"'
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: '3',
    name: 'Martin D-28 Acoustic Guitar',
    brand: 'Martin',
    model: 'D-28',
    price: 3299,
    description: 'Акустична гітара з неперевершеним звучанням',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400',
    category: 'acoustic',
    specifications: {
      bodyMaterial: 'East Indian Rosewood',
      neckMaterial: 'Select Hardwood',
      fingerboard: 'East Indian Rosewood',
      strings: 6,
      scale: '25.4"'
    },
    inStock: true,
    rating: 4.7,
    reviewsCount: 67
  },
  {
    id: '4',
    name: 'Yamaha FG830 Acoustic Guitar',
    brand: 'Yamaha',
    model: 'FG830',
    price: 299,
    description: 'Доступна акустична гітара для початківців та любителів',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400',
    category: 'acoustic',
    specifications: {
      bodyMaterial: 'Rosewood',
      neckMaterial: 'Nato',
      fingerboard: 'Rosewood',
      strings: 6,
      scale: '25"'
    },
    inStock: true,
    rating: 4.5,
    reviewsCount: 203
  },
  {
    id: '5',
    name: 'Fender Player Precision Bass',
    brand: 'Fender',
    model: 'Precision Bass',
    price: 849,
    description: 'Класична бас-гітара з глибоким низьким звучанням',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    category: 'bass',
    specifications: {
      bodyMaterial: 'Alder',
      neckMaterial: 'Maple',
      fingerboard: 'Pau Ferro',
      pickups: 'Player Series Split Single-Coil',
      strings: 4,
      scale: '34"'
    },
    inStock: false,
    rating: 4.6,
    reviewsCount: 78
  }
];