import { CITIES } from '../../mocks/offers';
import { CITIES_DATA } from '../../mocks/offers';
import OffersList from '../components/OffersList';
import { useState } from 'react';
import Map from '../components/Map';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { changeCity } from '../../store/actions';
import CitiesList from '../components/CitiesList';
import { toggleFavorite } from '../../store/offersSlice';
import SortingOptions from '../components/SortingOptions';
import { SortType } from '../../types/types';
import Header from '../components/Header';


const MainPage: React.FC = () => {
  const city = useAppSelector((state) => state.city.city);
  const offers = useAppSelector((state) => state.offers.offers);
  const dispatch = useAppDispatch();
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

  const cityData = CITIES_DATA[city];

  const onFavoriteClick = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="page page--gray page--main">

      <Header />


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
