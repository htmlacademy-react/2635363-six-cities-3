import React from 'react';
import MainPage from './pages/MainPage';
import { MainPageProps } from '../types/types';
// import OfferPage from './pages/OfferPage';
// import FavoritesPage from './pages/FavoritesPage';

const App: React.FC<MainPageProps> = ({ offers }) => < MainPage offers={offers} />;

export default App;
