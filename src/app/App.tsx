import React from 'react';
import MainPage from './pages/MainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivateRoute';


const isAuthenticated = true;

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Приватный маршрут */}
      <Route path="/favorites" element={
        <PrivateRoute isAuthenticated={isAuthenticated}>
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
