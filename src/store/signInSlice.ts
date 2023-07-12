import { createSlice } from '@reduxjs/toolkit';

import { AppState } from './store';

export interface OpenSignInState {
  isOpen: boolean;
}

const initialState: OpenSignInState = {
  isOpen: false,
};

export const openSignInSlice = createSlice({
  name: 'openSignIn',
  initialState,
  reducers: {
    setOpenSignIn(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpenSignIn } = openSignInSlice.actions;

export const selectIsOpenSignIn = (state: AppState) => state.openSignIn?.isOpen;

export default openSignInSlice.reducer;
