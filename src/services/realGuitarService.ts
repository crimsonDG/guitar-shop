import type { Guitar } from '../types/guitar';

// Функція для отримання правильного шляху до зображення
const getImagePath = (imageName: string): string => {
  const basePath = import.meta.env.PROD ? '/guitar-shop' : '';
  return `${basePath}/images/guitars/${imageName}`;
};

// Реальні дані гітар з правильними моделями
const REAL_GUITARS_DATA: Guitar[] = [
  {
    id: '1',
    name: 'CORT G110 Open Pore Black Cherry',
    brand: 'Cort',
    model: 'G110',
    price: 299,
    description: 'The Cort G110 electric guitar features a comfortable body shape with excellent playability. Open Pore Black Cherry finish gives it a modern, sophisticated look while maintaining the natural feel of the wood.',
    imageUrl: getImagePath('cort.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Basswood',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '2 Humbuckers',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.3,
    reviewsCount: 87
  },
  {
    id: '2',
    name: 'CORT KX300 Raw Burst',
    brand: 'Cort',
    model: 'KX300',
    price: 449,
    description: 'The Cort KX300 offers exceptional value with professional features. Raw Burst finish showcases beautiful wood grain patterns while delivering powerful tone and sustain.',
    imageUrl: getImagePath('cort_kx300.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Mahogany',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '2 Humbuckers',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.5,
    reviewsCount: 134
  },
  {
    id: '3',
    name: 'IBANEZ GRX70QA TRB',
    brand: 'Ibanez',
    model: 'GRX70QA',
    price: 279,
    description: 'The Ibanez GRX70QA features quilted maple art grain top with transparent red burst finish. Perfect for beginners and intermediate players seeking quality and style.',
    imageUrl: getImagePath('ibanez.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Poplar with Quilted Maple Art Grain top',
      neckMaterial: 'Maple',
      fingerboard: 'Purpleheart',
      pickups: '2 Infinity R + 1 Infinity RS',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.4,
    reviewsCount: 203
  },
  {
    id: '4',
    name: 'IBANEZ GRG7221QA TKS',
    brand: 'Ibanez',
    model: 'GRG7221QA',
    price: 399,
    description: '7-string electric guitar with quilted maple art grain top. The GRG7221QA delivers extended range for modern metal and progressive styles with exceptional playability.',
    imageUrl: getImagePath('ibanez_tks.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Poplar with Quilted Maple Art Grain top',
      neckMaterial: 'Maple',
      fingerboard: 'Purpleheart',
      pickups: '2 Infinity R7 Humbuckers',
      strings: 7,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.6,
    reviewsCount: 156
  },
  {
    id: '5',
    name: 'JACKSON JS12 AR Metallic Blue',
    brand: 'Jackson',
    model: 'JS12',
    price: 199,
    description: 'The Jackson JS12 Dinky features a striking metallic blue finish with classic Jackson styling. Great entry-level guitar with authentic Jackson DNA and aggressive tone.',
    imageUrl: getImagePath('jackson.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Poplar',
      neckMaterial: 'Maple',
      fingerboard: 'Amaranth',
      pickups: '2 Jackson High-Output Humbuckers',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.2,
    reviewsCount: 89
  },
  {
    id: '6',
    name: 'Jay Turser JT30 MRD',
    brand: 'Jay Turser',
    model: 'JT30',
    price: 159,
    description: 'The Jay Turser JT30 in metallic red delivers classic electric guitar tone at an affordable price. Perfect for students and budget-conscious musicians.',
    imageUrl: getImagePath('jay_turser.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Basswood',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '3 Single-Coil',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.0,
    reviewsCount: 67
  },
  {
    id: '7',
    name: 'PARKSONS ST-40 3-Tone Sunburst',
    brand: 'Parksons',
    model: 'ST-40',
    price: 129,
    description: 'The Parksons ST-40 features classic 3-tone sunburst finish with traditional styling. An excellent choice for beginners looking for authentic electric guitar experience.',
    imageUrl: getImagePath('parkons.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Basswood',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '3 Single-Coil',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 3.9,
    reviewsCount: 45
  },
  {
    id: '8',
    name: 'YAMAHA PACIFICA 112J L',
    brand: 'Yamaha',
    model: 'PACIFICA 112J',
    price: 349,
    description: 'The Yamaha Pacifica 112J Left-handed version delivers legendary Yamaha quality and tone. Features HSS pickup configuration for versatile sound options.',
    imageUrl: getImagePath('yamaha.png'),
    category: 'electric',
    specifications: {
      bodyMaterial: 'Alder',
      neckMaterial: 'Maple',
      fingerboard: 'Rosewood',
      pickups: '1 Humbucker + 2 Single-Coil',
      strings: 6,
      scale: '25.5"'
    },
    inStock: true,
    rating: 4.7,
    reviewsCount: 298
  },
  // Додаємо кілька акустичних та бас гітар для різноманітності
  {
    id: '9',
    name: 'Martin D-28 Standard Series',
    brand: 'Martin',
    model: 'D-28',
    price: 3199,
    description: 'The Martin D-28 is the cornerstone of the Martin line. The bold, booming voice of the D-28 can be heard on countless recordings by the biggest names in music.',
    imageUrl: getImagePath('Martin D-28.png'),
    category: 'acoustic',
    specifications: {
      bodyMaterial: 'East Indian Rosewood Back and Sides, Sitka Spruce Top',
      neckMaterial: 'Select Hardwood',
      fingerboard: 'East Indian Rosewood',
      strings: 6,
      scale: '25.4"'
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 156
  },
  {
    id: '10',
    name: 'Fender Player Precision Bass',
    brand: 'Fender',
    model: 'Player Precision Bass',
    price: 879,
    description: 'The inspiring sound of a Precision Bass is one of the foundations of Fender. Featuring the classic split-coil pickup design.',
    imageUrl: getImagePath('bas-gitara-fender-player-precision-bass.png'),
    category: 'bass',
    specifications: {
      bodyMaterial: 'Alder',
      neckMaterial: 'Maple',
      fingerboard: 'Pau Ferro',
      pickups: 'Player Series Split Single-Coil Precision Bass',
      strings: 4,
      scale: '34"'
    },
    inStock: true,
    rating: 4.7,
    reviewsCount: 234
  },
  {
    id: '11',
    name: 'Yamaha C40 Classical Guitar',
    brand: 'Yamaha',
    model: 'C40',
    price: 149,
    description: 'The C40 features a spruce top with meranti back and sides that deliver a bright, clear tone perfect for classical playing.',
    imageUrl: getImagePath('c40-II-main-yamaha.png'),
    category: 'classical',
    specifications: {
      bodyMaterial: 'Meranti Back/Sides, Spruce Top',
      neckMaterial: 'Nato',
      fingerboard: 'Rosewood',
      strings: 6,
      scale: '25.6"'
    },
    inStock: true,
    rating: 4.3,
    reviewsCount: 1247
  },
  {
    id: '12',
    name: 'Music Man StingRay Bass',
    brand: 'Music Man',
    model: 'StingRay',
    price: 2199,
    description: 'The Music Man StingRay bass is an icon in the bass world, known for its distinctive tone and high-quality construction.',
    imageUrl: getImagePath('MusicmanStingray.png'),
    category: 'bass',
    specifications: {
      bodyMaterial: 'Ash',
      neckMaterial: 'Maple',
      fingerboard: 'Maple',
      pickups: 'Music Man Humbucker',
      strings: 4,
      scale: '34"'
    },
    inStock: false,
    rating: 4.8,
    reviewsCount: 92
  }
];

// Симуляція API з реальними даними
export const realGuitarService = {
  async getAllGuitars(): Promise<Guitar[]> {
    // Симулюємо затримку мережі
    await new Promise(resolve => setTimeout(resolve, 800));
    return REAL_GUITARS_DATA;
  },

  async getGuitarById(id: string): Promise<Guitar | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return REAL_GUITARS_DATA.find(guitar => guitar.id === id) || null;
  },

  async getGuitarsByCategory(category: string): Promise<Guitar[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (category === 'all') return REAL_GUITARS_DATA;
    return REAL_GUITARS_DATA.filter(guitar => guitar.category === category);
  },

  async searchGuitars(query: string): Promise<Guitar[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lowercaseQuery = query.toLowerCase();
    return REAL_GUITARS_DATA.filter(guitar => 
      guitar.name.toLowerCase().includes(lowercaseQuery) ||
      guitar.brand.toLowerCase().includes(lowercaseQuery) ||
      guitar.model.toLowerCase().includes(lowercaseQuery) ||
      guitar.description.toLowerCase().includes(lowercaseQuery)
    );
  },

  async getGuitarsByPriceRange(minPrice: number, maxPrice: number): Promise<Guitar[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return REAL_GUITARS_DATA.filter(guitar => 
      guitar.price >= minPrice && guitar.price <= maxPrice
    );
  },

  async getFeaturedGuitars(): Promise<Guitar[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return REAL_GUITARS_DATA
      .filter(guitar => guitar.rating >= 4.5)
      .slice(0, 6);
  }
};