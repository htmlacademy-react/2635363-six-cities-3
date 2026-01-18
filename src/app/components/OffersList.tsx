import { OfferPreview } from '../../types/types';
import OfferCard from './OfferCard';
import { useState } from 'react';

type OffersListProps = {
  offers: OfferPreview[];
};

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleOfferMouseEnter = (id: string) => setActiveOfferId(id);
  const handleOfferMouseLeave = () => setActiveOfferId(null);
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          isActive={offer.id === activeOfferId}
          onOfferMouseEnter={handleOfferMouseEnter}
          onOfferMouseLeave={handleOfferMouseLeave}
        />
      ))}
    </>
  );
};

export default OffersList;
