import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Guitar, GuitarCategory } from '../../types/guitar';

interface GuitarState {
  guitars: Guitar[];
  loading: boolean;
  error: string | null;
  selectedCategory: GuitarCategory | 'all';
  searchQuery: string;
}

const initialState: GuitarState = {
  guitars: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
};

const guitarSlice = createSlice({
  name: 'guitars',
  initialState,
  reducers: {
    setGuitars: (state, action: PayloadAction<Guitar[]>) => {
      state.guitars = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedCategory: (state, action: PayloadAction<GuitarCategory | 'all'>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setGuitars, setLoading, setError, setSelectedCategory, setSearchQuery } = guitarSlice.actions;
export default guitarSlice.reducer;