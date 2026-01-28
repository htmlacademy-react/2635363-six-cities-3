import { OfferPreview } from '../../types/types';
import OfferCard from './OfferCard';
// import { useState } from 'react';

type OffersListProps = {
  offers: OfferPreview[];
  activeOfferId: string | null;
  onFavoriteClick: (id: string) => void;
  onActiveOfferChange: (id: string | null) => void;
};

const OffersList: React.FC<OffersListProps> = ({ offers, onFavoriteClick, onActiveOfferChange, activeOfferId }) => {
  // const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleOfferMouseEnter = (id: string) => {
    // setActiveOfferId(id);
    onActiveOfferChange?.(id);
  };
  const handleOfferMouseLeave = () => {
    // setActiveOfferId(null);
    onActiveOfferChange?.(null);
  };
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          isActive={offer.id === activeOfferId}
          onOfferMouseEnter={handleOfferMouseEnter}
          onOfferMouseLeave={handleOfferMouseLeave}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </>
  );
};

export default OffersList;
