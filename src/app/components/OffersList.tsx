import OfferCard from './OfferCard';
import { OffersListProps } from '../../types/types';

const OffersList: React.FC<OffersListProps> = ({ offers, onFavoriteClick, onActiveOfferChange, activeOfferId }) => {

  const handleOfferMouseEnter = (id: string) => {
    onActiveOfferChange?.(id);
  };
  const handleOfferMouseLeave = () => {
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
          variant="cities"
        />
      ))}
    </>
  );
};

export default OffersList;
