import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store-hooks';
import { logoutAsync } from '../../store/authSlice';
import { RootState } from '../../store/store-hooks';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { authorizationStatus, user } = useAppSelector((state: RootState) => state.auth);

  const offers = useAppSelector((state: RootState) => state.offers.offers);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="*">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === 'AUTH' && user ? (
                <>
                  {/* авторизованый пользователь */}
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${user.avatarUrl})`,
                          borderRadius: '50%',
                        }}
                      >
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </ Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* неавторизованый пользователь */}
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header >
  );
};

export default Header;
