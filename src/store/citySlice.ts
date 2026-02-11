import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityState } from '../types/types';

const cityInitialState: CityState = {
  city: 'Paris',
};

const citySlice = createSlice({
  name: 'city',
  initialState: cityInitialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;
export default citySlice.reducer;
