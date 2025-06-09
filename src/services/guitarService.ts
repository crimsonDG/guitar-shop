import type { Guitar } from '../types/guitar';
import { realGuitarService } from './realGuitarService';

// Основний сервіс для роботи з гітарами
export const guitarService = {
  // Отримати всі гітари
  async getAllGuitars(): Promise<Guitar[]> {
    return await realGuitarService.getAllGuitars();
  },

  // Отримати гітару за ID
  async getGuitarById(id: string): Promise<Guitar | null> {
    return await realGuitarService.getGuitarById(id);
  },

  // Отримати гітари за категорією
  async getGuitarsByCategory(category: string): Promise<Guitar[]> {
    return await realGuitarService.getGuitarsByCategory(category);
  },

  // Пошук гітар
  async searchGuitars(query: string): Promise<Guitar[]> {
    return await realGuitarService.searchGuitars(query);
  },

  // Отримати гітари за ціновим діапазоном
  async getGuitarsByPriceRange(minPrice: number, maxPrice: number): Promise<Guitar[]> {
    return await realGuitarService.getGuitarsByPriceRange(minPrice, maxPrice);
  },

  // Отримати рекомендовані гітари
  async getFeaturedGuitars(): Promise<Guitar[]> {
    return await realGuitarService.getFeaturedGuitars();
  },

  // Фільтрувати гітари за кількома параметрами
  async getFilteredGuitars(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
    inStockOnly?: boolean;
  }): Promise<Guitar[]> {
    let guitars = await this.getAllGuitars();

    // Фільтр за категорією
    if (filters.category && filters.category !== 'all') {
      guitars = guitars.filter(guitar => guitar.category === filters.category);
    }

    // Фільтр за ціною
    if (filters.minPrice !== undefined) {
      guitars = guitars.filter(guitar => guitar.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      guitars = guitars.filter(guitar => guitar.price <= filters.maxPrice!);
    }

    // Пошук за запитом
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      guitars = guitars.filter(guitar => 
        guitar.name.toLowerCase().includes(query) ||
        guitar.brand.toLowerCase().includes(query) ||
        guitar.model.toLowerCase().includes(query) ||
        guitar.description.toLowerCase().includes(query)
      );
    }

    // Фільтр за наявністю
    if (filters.inStockOnly) {
      guitars = guitars.filter(guitar => guitar.inStock);
    }

    return guitars;
  },

  // Отримати статистику
  async getStatistics() {
    const guitars = await this.getAllGuitars();
    
    return {
      total: guitars.length,
      inStock: guitars.filter(g => g.inStock).length,
      outOfStock: guitars.filter(g => !g.inStock).length,
      categories: {
        electric: guitars.filter(g => g.category === 'electric').length,
        acoustic: guitars.filter(g => g.category === 'acoustic').length,
        classical: guitars.filter(g => g.category === 'classical').length,
        bass: guitars.filter(g => g.category === 'bass').length,
      },
      priceRange: {
        min: Math.min(...guitars.map(g => g.price)),
        max: Math.max(...guitars.map(g => g.price)),
        average: guitars.reduce((sum, g) => sum + g.price, 0) / guitars.length
      }
    };
  }
};