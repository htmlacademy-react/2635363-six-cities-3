import { Link, useParams } from 'react-router-dom';
import { OffersFull } from '../../types/types';
import { getRatingWidth } from '../utils/rating';
import { reviews } from '../../mocks/reviews';
import ReviewList from '../components/ReviewList';
import Map from '../components/Map';
import OfferCard from '../components/OfferCard';

export interface OfferPageProps {
  offers: OffersFull[];
}

const OfferPage: React.FC<OfferPageProps> = ({ offers }) => {
  const { id } = useParams<{ id: string }>();
  const currentOffer = offers.find((offer) => offer.id === id);

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

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                <button className="offer__bookmark-button button" type="button">
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
            <Map city={currentOffer.city} offers={onMapOffers} />
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
                  isActive={false}
                  onOfferMouseEnter={() => { }}
                  onOfferMouseLeave={() => { }}
                  onFavoriteClick={() => { }}
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
