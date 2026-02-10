import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as cityReducer } from './reducer';
import offersReducer from './offersSlice';
import { createAPI } from '../api/api';

const api = createAPI();

const rootReducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

