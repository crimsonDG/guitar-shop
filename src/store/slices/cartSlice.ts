import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Guitar } from '../../types/guitar';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Guitar>) => {
      const existingItem = state.items.find(item => item.guitar.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ guitar: action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + (item.guitar.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.guitar.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.guitar.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.guitar.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else if (item && action.payload.quantity <= 0) {
        state.items = state.items.filter(item => item.guitar.id !== action.payload.id);
      }
      state.total = state.items.reduce((sum, item) => sum + (item.guitar.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;