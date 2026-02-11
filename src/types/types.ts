
export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface CityState {
  city: string;
}

export interface CitiesListProps {
  cities: string[];
  activeCity: string;
  onCityClick: (city: string) => void;
}

export type CardVariant = 'cities' | 'favorites' | 'nearPlaces';

export interface OfferCardProps {
  offer: OfferPreview;
  isActive: boolean;
  onOfferMouseEnter: (id: string) => void;
  onOfferMouseLeave: () => void;
  onFavoriteClick: (id: string) => void;
  variant: CardVariant;
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
  isPremium: boolean;

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


export interface OffersState {
  offers: OffersFull[];
  isLoading: boolean;
  hasError: boolean;
}

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRated';

export type SortingOptionsProps = {
  sortType: SortType;
  onSortTypeChange: (type: SortType) => void;
}

export type AuthorizationStatus = 'AUTH' | 'NO_AUTH';

export interface AuthInfo {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface AuthState {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  isLoading: boolean;
  hasError: boolean;
}
