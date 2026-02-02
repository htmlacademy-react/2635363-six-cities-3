import { Link } from 'react-router-dom';
import { OfferPreview } from '../../types/types';
import OfferCard from '../components/OfferCard';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { toggleFavorite } from '../../store/offersSlice';
import { useSelector } from 'react-redux';

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state: RootState) => state.offers.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const groupedByCity = favoriteOffers
    .filter((offer): offer is OfferPreview & { city: { name: string } } => !!offer.city?.name)
    .reduce<Record<string, OfferPreview[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {});

  const onFavoriteClick = (id: string) => {
    dispatch(toggleFavorite(id));
  };

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
                  <Link className="header__nav-link header__nav-link--profile" to="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
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
                      <OfferCard isActive={false} key={offer.id} offer={offer} onOfferMouseEnter={() => { }} onOfferMouseLeave={() => { }}
                        onFavoriteClick={onFavoriteClick}
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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
