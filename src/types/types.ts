
export interface MainPageProps {
  offers: OfferCardProps[];
}

export interface OfferCardProps {
  id: number;
  price: number;
  rating: number; // 0–100 (%)
  title: string;
  type: string;
  image: string;
}
