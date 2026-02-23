
import { OffersFull } from '../../types/types';
import OfferCard from '../components/OfferCard';
import FavoritesEmpty from './FavoritesEmpty';
import { RootState } from '../../store/store-hooks';
import { useAppSelector } from '../../store/store-hooks';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useFavoriteToggle } from '../../hoocks/useFavoriteToggle';

const FavoritesPage: React.FC = () => {
  const offers = useAppSelector((state: RootState) => state.offers.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const onFavoriteClick = useFavoriteToggle();

  if (favoriteOffers.length === 0) {
    return <FavoritesEmpty />;
  }

  const groupedByCity = favoriteOffers
    .filter((offer): offer is OffersFull & { city: { name: string } } => !!offer.city?.name)
    .reduce<Record<string, OffersFull[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {});

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
                <li key={cityName} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <span className="locations__item-link">{cityName}</span>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <OfferCard
                        isActive={false}
                        key={offer.id}
                        offer={offer}
                        onOfferMouseEnter={() => { }} onOfferMouseLeave={() => { }}
                        onFavoriteClick={() => onFavoriteClick({
                          id: offer.id,
                          isFavorite: offer.isFavorite,
                        })}
                        variant="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
