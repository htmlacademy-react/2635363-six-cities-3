import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { OfferCardProps } from './app/components/OfferCard';

const offers: OfferCardProps[] = [
  { price: 80, rating: 80, title: 'Wood and stone place', type: 'Room', image: 'img/room.jpg' },
  { price: 120, rating: 90, title: 'Beautiful & luxurious apartment at great location', type: 'Apartment', image: 'img/apartment-01.jpg' },
  { price: 132, rating: 95, title: 'Canal View Prinsengracht', type: 'Apartment', image: 'img/apartment-02.jpg' },
  { price: 180, rating: 100, title: 'Nice, cozy, warm big bed apartment', type: 'Apartment', image: 'img/apartment-03.jpg' },
  { price: 80, rating: 80, title: 'Wood and stone place', type: 'Room', image: 'img/room.jpg' },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>
);
