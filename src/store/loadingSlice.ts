import { createSlice } from '@reduxjs/toolkit';

import { AppState } from './store';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectIsLoading = (state: AppState) => state.loading?.isLoading;

export default loadingSlice.reducer;
