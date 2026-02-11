import { Link } from 'react-router-dom';
import { getRatingWidth } from '../utils/rating';
import { CardVariant, OfferCardProps } from '../../types/types';

const IMAGE_SIZES: Record<CardVariant, { width: number; height: number }> = {
  cities: { width: 260, height: 200 },
  nearPlaces: { width: 260, height: 200 },
  favorites: { width: 150, height: 110 },
};

const IMAGE_WRAPPER_CLASS: Record<CardVariant, string> = {
  cities: 'cities__image-wrapper',
  nearPlaces: 'near-places__image-wrapper',
  favorites: 'favorites__image-wrapper',
};

const CARD_CLASS: Record<CardVariant, string> = {
  cities: 'cities__card',
  nearPlaces: 'near-places__card',
  favorites: 'favorites__card',
};

type Props = OfferCardProps & {
  variant: CardVariant;
}

const OfferCard: React.FC<Props> = ({
  offer,
  onOfferMouseEnter,
  onOfferMouseLeave,
  onFavoriteClick,
  variant,
}) => {
  const { id, price, rating, title, type, previewImage, isFavorite = false, isPremium = false } = offer;

  const { width, height } = IMAGE_SIZES[variant];

  return (
    <article
      onMouseEnter={() => onOfferMouseEnter(id)}
      onMouseLeave={() => onOfferMouseLeave()}
      className={`${CARD_CLASS[variant]} place-card`}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${IMAGE_WRAPPER_CLASS[variant]} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`} key={id}>
          <img className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={() => onFavoriteClick(offer.id)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(rating)}` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} key={id}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >
  );
};

export default OfferCard;
