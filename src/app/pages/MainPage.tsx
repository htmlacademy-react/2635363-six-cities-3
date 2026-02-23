
import OffersList from '../components/OffersList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Map from '../components/Map';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { changeCity } from '../../store/citySlice';
import CitiesList from '../components/CitiesList';
import CitiesEmpty from '../components/CitiesEmpty';
import SortingOptions from '../components/SortingOptions';
import Header from '../components/Header';
import { fetchOffers } from '../../store/offersSlice';
import Spinner from '../components/spinner/Spinner';
import { CITIES } from '../../const/const';
import { SortType } from '../../types/types';
import { useFavoriteToggle } from '../../hoocks/useFavoriteToggle';


const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers.offers);
  const city = useAppSelector((state) => state.city.city);

  const [activeOfferId, setActiveOfferId] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('Popular');


  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const filteredOffers = useMemo(() => offers.filter(
    (offer) => offer.city?.name === city
  ), [offers, city]);

  const isEmpty = filteredOffers.length === 0;
  const cityData = filteredOffers[0]?.city;

  const sortedOffers = useMemo(() => {
    const sorted = [...filteredOffers];

    sorted.sort((a, b) => {
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

    return sorted;
  }, [filteredOffers, sortType]);

  const onCityClick = useCallback((cityName: string) => {
    dispatch(changeCity(cityName));
  }, [dispatch]);

  const onFavoriteClick = useFavoriteToggle();

  const isLoading = useAppSelector((state) => state.offers.isLoading);
  const hasError = useAppSelector((state) => state.offers.hasError);

  if (isLoading) {
    return <Spinner />;
  }
  if (hasError) {
    return <p>Сервер временно недоступен 😿</p>;
  }

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CitiesList cities={CITIES} activeCity={city} onCityClick={onCityClick} />

          </section>
        </div>
        <div className="cities">
          {isEmpty ? (
            <CitiesEmpty city={city} />
          ) : (
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
                    onFavoriteClick={onFavoriteClick}
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
          )}
        </div >
      </main >
    </div >
  );
};
export default MainPage;
