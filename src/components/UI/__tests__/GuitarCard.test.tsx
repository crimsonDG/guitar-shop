import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GuitarCard } from '../GuitarCard'
import cartSlice from '../../../store/slices/cartSlice'
import type { Guitar } from '../../../types/guitar'

const mockGuitar: Guitar = {
  id: '1',
  name: 'Test Guitar',
  brand: 'Test Brand',
  model: 'Test Model',
  price: 500,
  description: 'Test description',
  imageUrl: 'https://example.com/test.jpg',
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

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
    },
  })
}

const renderWithStore = (component: React.ReactElement) => {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('GuitarCard Component', () => {
  test('renders guitar information correctly', () => {
    renderWithStore(<GuitarCard guitar={mockGuitar} />)
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument()
    expect(screen.getByText('Test Guitar')).toBeInTheDocument()
    expect(screen.getByText('$500')).toBeInTheDocument()
    expect(screen.getByText('(10)')).toBeInTheDocument()
  })

  test('shows in stock badge when guitar is in stock', () => {
    renderWithStore(<GuitarCard guitar={mockGuitar} />)
    
    expect(screen.getByText('✓ In Stock')).toBeInTheDocument()
  })

  test('shows out of stock badge when guitar is not in stock', () => {
    const outOfStockGuitar = { ...mockGuitar, inStock: false }
    renderWithStore(<GuitarCard guitar={outOfStockGuitar} />)
    
    expect(screen.getByText('✗ Out of Stock')).toBeInTheDocument()
  })

  test('calls onViewDetails when Details button is clicked', () => {
    const onViewDetails = vi.fn()
    renderWithStore(<GuitarCard guitar={mockGuitar} onViewDetails={onViewDetails} />)
    
    fireEvent.click(screen.getByText('Details'))
    expect(onViewDetails).toHaveBeenCalledWith('1')
  })

  test('Add to Cart button is disabled when guitar is out of stock', () => {
    const outOfStockGuitar = { ...mockGuitar, inStock: false }
    renderWithStore(<GuitarCard guitar={outOfStockGuitar} />)
    
    expect(screen.getByText('Add to Cart')).toBeDisabled()
  })
})