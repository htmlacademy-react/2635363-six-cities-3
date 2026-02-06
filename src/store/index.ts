import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as cityReducer } from './reducer';
import offersReducer from './offersSlice';


const rootReducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

