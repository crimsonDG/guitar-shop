import { describe, test, expect } from 'vitest'
import { guitarService } from '../guitarService'

describe('guitarService', () => {
  test('should return all guitars', async () => {
    const guitars = await guitarService.getAllGuitars()
    
    expect(guitars).toBeDefined()
    expect(Array.isArray(guitars)).toBe(true)
    expect(guitars.length).toBeGreaterThan(0)
  })

  test('should return guitar by id', async () => {
    const guitar = await guitarService.getGuitarById('1')
    
    expect(guitar).toBeDefined()
    expect(guitar?.id).toBe('1')
  })

  test('should return null for non-existent guitar id', async () => {
    const guitar = await guitarService.getGuitarById('999')
    
    expect(guitar).toBeNull()
  })

  test('should filter guitars by price range', async () => {
    const guitars = await guitarService.getGuitarsByPriceRange(500, 1000)
    
    expect(guitars).toBeDefined()
    expect(Array.isArray(guitars)).toBe(true)
    guitars.forEach(guitar => {
      expect(guitar.price).toBeGreaterThanOrEqual(500)
      expect(guitar.price).toBeLessThanOrEqual(1000)
    })
  })

  test('should search guitars by query', async () => {
    const guitars = await guitarService.searchGuitars('Fender')
    
    expect(guitars).toBeDefined()
    expect(Array.isArray(guitars)).toBe(true)
    
    if (guitars.length > 0) {
      expect(
        guitars.some(guitar => 
          guitar.name.toLowerCase().includes('fender') ||
          guitar.brand.toLowerCase().includes('fender')
        )
      ).toBe(true)
    }
  })
})