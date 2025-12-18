import React from 'react';
import MainPage from './pages/MainPage';
import { MainPageProps } from '../types/types';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivateRoute';


// const App: React.FC<MainPageProps> = ({ offers }) => < MainPage offers={offers} />;

const App: React.FC<MainPageProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage offers={offers} />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Приватный маршрут */}
      <Route path="/favorites" element={
        <PrivateRoute>
          <FavoritesPage />
        </PrivateRoute>
      }
      />

      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
