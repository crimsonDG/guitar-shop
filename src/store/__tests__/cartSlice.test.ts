import { describe, test, expect } from 'vitest'
import cartReducer, { addToCart, removeFromCart, clearCart } from '../slices/cartSlice'
import type { Guitar } from '../../types/guitar'

const mockGuitar: Guitar = {
  id: '1',
  name: 'Test Guitar',
  brand: 'Test Brand',
  model: 'Test Model',
  price: 100,
  description: 'Test description',
  imageUrl: 'test.jpg',
  category: 'electric',
  specifications: {
    bodyMaterial: 'Test',
    neckMaterial: 'Test',
    fingerboard: 'Test',
    strings: 6,
    scale: '25"'
  },
  inStock: true,
  rating: 4.5,
  reviewsCount: 10
}

describe('cartSlice', () => {
  test('should add item to cart', () => {
    const initialState = { items: [], total: 0 }
    const action = addToCart(mockGuitar)
    const state = cartReducer(initialState, action)
    
    expect(state.items).toHaveLength(1)
    expect(state.items[0].guitar.id).toBe('1')
    expect(state.items[0].quantity).toBe(1)
    expect(state.total).toBe(100)
  })

  test('should increment quantity for existing item', () => {
    const initialState = {
      items: [{ guitar: mockGuitar, quantity: 1 }],
      total: 100
    }
    const action = addToCart(mockGuitar)
    const state = cartReducer(initialState, action)
    
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
    expect(state.total).toBe(200)
  })

  test('should remove item from cart', () => {
    const initialState = {
      items: [{ guitar: mockGuitar, quantity: 1 }],
      total: 100
    }
    const action = removeFromCart('1')
    const state = cartReducer(initialState, action)
    
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
  })

  test('should clear cart', () => {
    const initialState = {
      items: [{ guitar: mockGuitar, quantity: 2 }],
      total: 200
    }
    const action = clearCart()
    const state = cartReducer(initialState, action)
    
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
  })
})