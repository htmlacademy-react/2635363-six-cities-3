import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersFull, OffersState } from '../types/types';
import { AxiosInstance } from 'axios';

export const fetchOffers = createAsyncThunk<
  OffersFull[],
  undefined,
  { extra: AxiosInstance }
>('offers/fetchOffers', async (_, { extra: api }) => {
  const { data } = await api.get<OffersFull[]>('/six-cities/offers');
  return data;
});

const offersInitialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState: offersInitialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const favoriteOffer = state.offers.find((offer) => offer.id === action.payload);
      if (favoriteOffer) {
        favoriteOffer.isFavorite = !favoriteOffer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { toggleFavorite } = offersSlice.actions;
export default offersSlice.reducer;
