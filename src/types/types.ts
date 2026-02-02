
export interface MainPageProps {
  offers: OfferPreview[];
}

export interface AppProps {
  offers: OffersFull[];
  onFavoriteClick: (id: string) => void;
}


export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface CitiesListProps {
  cities: string[];
  activeCity: string;
  onCityClick: (city: string) => void;
}

export interface LoginPageProps {
}

export interface FavoritesPageProps {
  offers: OfferPreview[];
  onFavoriteClick: (id: string) => void;
}

export interface OfferPageProps {
  offers: OffersFull[];
}

export interface OfferCardProps {
  offer: OfferPreview;
  isActive: boolean;
  onOfferMouseEnter: (id: string) => void;
  onOfferMouseLeave: () => void;
  onFavoriteClick: (id: string) => void;
  className?: string;
}

export interface OfferPreview {
  id: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  previewImage: string;

  city: City;
  location: Location;

  isFavorite: boolean;
  isPremium?: boolean;

}

export interface OffersFull extends OfferPreview {
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];

  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };

  images: string[];
}

export interface Review {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

export type MapProps = {
  city: City;
  offers: OfferPreview[];
  activeOfferId?: string | null;
};

export type OffersListProps = {
  offers: OfferPreview[];
  activeOfferId: string | null;
  onFavoriteClick: (id: string) => void;
  onActiveOfferChange: (id: string | null) => void;
};

export interface ReviewItemProps {
  review: Review;
}

export interface ReviewListProps {
  reviews: Review[];
}

export interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

export type State = {
  city: string;
  offers: OfferPreview[];
}

export interface OffersState {
  offers: OfferPreview[];
}

export type ActionType = | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_OFFERS'; payload: OfferPreview[] };

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRated';

export type SortingOptionsProps = {
  sortType: SortType;
  onSortTypeChange: (type: SortType) => void;
}
