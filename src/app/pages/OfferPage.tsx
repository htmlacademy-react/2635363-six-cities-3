import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { getRatingWidth } from '../utils/rating';
import { reviews } from '../../mocks/reviews';
import ReviewList from '../components/ReviewList';
import Map from '../components/Map';
import OfferCard from '../components/OfferCard';
import { useState } from 'react';
import Header from '../components/Header';
import { toggleFavorite } from '../../store/offersSlice';
import { OffersFull } from '../../types/types';


const OfferPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers.offers);
  const { id } = useParams();

  const currentOffer = offers.find((offer: OffersFull) => offer.id === id);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  if (!id) {
    return <p>Invalid offer id</p>;
  }

  if (!currentOffer) {
    return <p>Offer not found</p>;
  }

  const nearbyOffers = offers.filter((offer) => offer.id !== currentOffer.id).slice(0, 3);
  const onMapOffers = [currentOffer, ...nearbyOffers];

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {currentOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image + id}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">

              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={
                    `offer__bookmark-button button ${currentOffer.isFavorite ?
                      'offer__bookmark-button--active' : ''
                    }`
                  }
                  onClick={() => dispatch(toggleFavorite(currentOffer.id))} type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRatingWidth(currentOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">${currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">

                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good + id}>
                      {good}
                    </li>
                  ))}

                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">

                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}
                  user__avatar-wrapper` }
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      alt="Host avatar"
                      width="74"
                      height="74"
                    />
                  </div>

                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>

                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>

              <ReviewList reviews={reviews} />

            </div>
          </div>
          <section className="offer__map map">
            <Map city={currentOffer.city} offers={onMapOffers} activeOfferId={activeOfferId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isActive={offer.id === activeOfferId}
                  onOfferMouseEnter={() => setActiveOfferId(offer.id)}
                  onOfferMouseLeave={() => setActiveOfferId(null)}
                  onFavoriteClick={() => dispatch(toggleFavorite(offer.id))}
                  className="near-places__card"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div >
  );
};
export default OfferPage;
