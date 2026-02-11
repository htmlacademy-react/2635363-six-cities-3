import React, { useEffect } from 'react';
import MainPage from './pages/MainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivateRoute';
import { useAppDispatch } from '../store/store-hooks';
import { checkAuth } from '../store/authSlice';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Приватный маршрут */}
        <Route path="/favorites" element={
          <PrivateRoute >
            <FavoritesPage />
          </PrivateRoute>
        }
        />

        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
