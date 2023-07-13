import { createSlice } from '@reduxjs/toolkit';

import { AppState } from './store';

export interface formOpenState {
  signInOpen: boolean;
  signUpOpen: boolean;
}

const initialState: formOpenState = {
  signInOpen: false,
  signUpOpen: false,
};

export const formOpenSlice = createSlice({
  name: 'formOpen',
  initialState,
  reducers: {
    setSignInOpen(state, action) {
      state.signInOpen = action.payload;
      state.signUpOpen = false;
    },
    setSignUpOpen(state, action) {
      state.signUpOpen = action.payload;
      state.signInOpen = false;
    },
  },
});

export const { setSignInOpen, setSignUpOpen } = formOpenSlice.actions;

export const selectIsSignInOpen = (state: AppState) => state.formOpen?.signInOpen;
export const selectIsSignUpOpen = (state: AppState) => state.formOpen?.signUpOpen;

export default formOpenSlice.reducer;
