import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cityReducer from './citySlice';
import offersReducer from './offersSlice';
import authReducer from './authSlice';
import { createAPI } from '../api/api';

const api = createAPI();

const rootReducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api, },
      serializableCheck: false,
    }),
});

