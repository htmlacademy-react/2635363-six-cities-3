import { CITIES } from '../../mocks/offers';
import { CITIES_DATA } from '../../mocks/offers';
import { Link } from 'react-router-dom';
import OffersList from '../components/OffersList';
import { useState } from 'react';
import Map from '../components/Map';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { changeCity } from '../../store/actions';
import CitiesList from '../components/CitiesList';
import { toggleFavorite } from '../../store/offersSlice';
import SortingOptions from '../components/SortingOptions';
import { SortType } from '../../types/types';


const MainPage: React.FC = () => {
  const city = useSelector((state: RootState) => state.city.city);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const dispatch = useDispatch();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('Popular');

  const filteredOffers = offers.filter(
    (offer) => offer.city?.name === city
  );
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortType) {
      case 'PriceLowToHigh':
        return a.price - b.price;
      case 'PriceHighToLow':
        return b.price - a.price;
      case 'TopRated':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const onCityClick = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const favoritesCount = offers.filter(
    (offer) => offer.isFavorite
  ).length;

  const cityData = CITIES_DATA[city];

  const onFavoriteClick = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CitiesList cities={CITIES} activeCity={city} onCityClick={onCityClick} />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city}</b>

              <SortingOptions
                sortType={sortType}
                onSortTypeChange={setSortType}
              />

              <div className="cities__places-list places__list tabs__content">

                <OffersList
                  offers={sortedOffers}
                  activeOfferId={activeOfferId}
                  onFavoriteClick={(id) => onFavoriteClick(id)}
                  onActiveOfferChange={setActiveOfferId}
                />

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                {cityData && (
                  <Map
                    city={cityData}
                    offers={sortedOffers}
                    activeOfferId={activeOfferId}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
};
export default MainPage;
