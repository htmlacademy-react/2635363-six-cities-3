import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { City, OfferPreview } from '../../types/types';

type MapProps = {
  city: City;
  offers: OfferPreview[];
  activeOfferId?: string | null;
};

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const Map: React.FC<MapProps> = ({ city, offers, activeOfferId }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      const map = leaflet.map(mapRef.current, {
        center: [
          city.location.latitude,
          city.location.longitude,
        ],
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        )
        .addTo(map);

      mapInstanceRef.current = map;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mapInstanceRef.current?.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [city]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) {
      return;
    }

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    const layer = leaflet.layerGroup().addTo(map);

    offers.forEach((offer) => {
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
        .addTo(layer);
    });

    markersLayerRef.current = layer;
  }, [offers, activeOfferId]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    />
  );
};

export default Map;
