import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import {
  signIn,
  signUp,
} from '../data/user';

export interface AuthState {
  authState: boolean;
  error: string;
}

const initialState: AuthState = {
  authState: false,
  error: '',
};

export const signInAsync = createAsyncThunk(
  'signin',
  async ({ email, password }: { email: string; password: string }, store) => {
    try {
      const user = await signIn(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  },
);

export const signUpAsync = createAsyncThunk(
  'signup',
  async (value: any, store) => {
    try {
      const user = await signUp(value);
      return user;
    } catch (error) {
      throw error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.error = '';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.authState = true;
        state.error = '';
        localStorage.setItem('access_token', action.payload.data.access_token);
        localStorage.setItem(
          'refresh_token',
          action.payload.data.refresh_token,
        );
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.authState = false;
        state.error = action.error.message ?? '';
      })

      //signUp
      .addCase(signUpAsync.pending, (state) => {
        state.error = '';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.authState = true;
        state.error = '';
        localStorage.setItem('access_token', action.payload.data.access_token);
        localStorage.setItem(
          'refresh_token',
          action.payload.data.refresh_token,
        );
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.authState = false;
        state.error = action.error.message ?? '';
      })
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth?.authState;

export default authSlice.reducer;
