
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import Header from '../components/Header';
import { FormEvent, useState } from 'react';
import { login } from '../../store/authSlice';
import { Link, Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authorizationStatus, isLoading, hasError } = useAppSelector((state) => state.auth);

  const city = useAppSelector((state) => state.city.city);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(login({ email, password }));
  };

  if (authorizationStatus === 'AUTH') {
    return <Navigate to="/" />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleLogin} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={email} onChange={(evt) => setEmail(evt.target.value)}
                  className="login__input form__input"
                  type="email" name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={password} onChange={(evt) => setPassword(evt.target.value)}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button disabled={isLoading} className="login__submit form__submit button" type="submit">Sign in</button>
              {hasError && <p >Ошибка авторизации:{hasError}</p>}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
