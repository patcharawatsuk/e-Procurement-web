import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import {
  signIn,
  signUp,
} from '../data/user';

export interface AuthState {
  authState: boolean,
  error: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
}

const initialState: AuthState = {
  authState: false,
  error: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
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
    setUserDetail(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    }
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

export const { setAuthState, setUserDetail } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth?.authState;

export const selectUserDetail = (state: AppState) => state.auth;

export default authSlice.reducer;
