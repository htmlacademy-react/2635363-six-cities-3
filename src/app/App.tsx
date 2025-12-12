import React from 'react';
import MainPage, { MainPageProps } from './pages/MainPage';


const App: React.FC<MainPageProps> = ({ offers }) => < MainPage offers={offers} />;

export default App;
