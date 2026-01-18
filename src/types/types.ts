
export interface MainPageProps {
  offers: OfferPreview[];
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

export interface OfferCardProps {
  offer: OfferPreview;
  isActive: boolean;
  onOfferMouseEnter: (id: string) => void;
  onOfferMouseLeave: () => void;
}

export interface OfferPreview {
  id: string;
  price: number;
  rating: number; // 0–5
  title: string;
  type: string;
  previewImage: string;

  city?: City;
  location?: Location;

  isFavorite?: boolean;
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
