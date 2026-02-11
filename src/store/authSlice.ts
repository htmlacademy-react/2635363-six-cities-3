import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthInfo, AuthState } from '../types/types';

export const checkAuth = createAsyncThunk<
  AuthInfo,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<AuthInfo>('/six-cities/login');
    return data;
  }
);

export const login = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  { extra: AxiosInstance }
>(
  'auth/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<AuthInfo>('/six-cities/login', { email, password });
    return data;
  }
);

export const logoutAsync = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/logout',
  async (_, { extra: api }) => {
    const token = localStorage.getItem('six-cities-token');
    if (token) {
      await api.delete('/six-cities/logout', {
        headers: {
          'X-Token': token,
        },
      });
    }
  }
);

const loginInitialState: AuthState = {
  authorizationStatus: 'NO_AUTH',
  user: null,
  isLoading: false,
  hasError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loginInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // logout
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
        state.user = null;
        localStorage.removeItem('six-cities-token');
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
      })
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthInfo>) => {
        state.isLoading = false;
        state.authorizationStatus = 'AUTH';
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthInfo>) => {
        state.isLoading = false;
        state.authorizationStatus = 'AUTH';
        state.user = action.payload;
        localStorage.setItem('six-cities-token', action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
      });
  },
});


export default authSlice.reducer;
