import { configureStore } from '@reduxjs/toolkit';
import guitarSlice from './slices/guitarSlice';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    guitars: guitarSlice,
    cart: cartSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;