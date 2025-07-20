// src/components/CashSellers.js
import React, { useState } from 'react';
import './CashSellers.css';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Dummy sellers
const dummySellers = [
  {
    name: 'Ahmed Exchange',
    rate: 3.05,
    availability: 'Open',
    verified: true,
    distance: '1.2 km',
    cashAvailable: '₪2,000',
    position: [31.504, 34.465],
    area: 'Gaza City',
  },
  {
    name: 'Fatima Cash Point',
    rate: 3.00,
    availability: 'Out of Cash',
    verified: false,
    distance: '3.1 km',
    cashAvailable: '₪0',
    position: [31.516, 34.475],
    area: 'Al-Rimal',
  },
  {
    name: 'Khan Younis Exchange',
    rate: 3.03,
    availability: 'Open',
    verified: true,
    distance: '15.6 km',
    cashAvailable: '₪5,000',
    position: [31.345, 34.305],
    area: 'Khan Younis',
  },
];

function CashSellers() {
  const [search, setSearch] = useState('');

  const filteredSellers = dummySellers.filter((seller) =>
    seller.name.toLowerCase().includes(search.toLowerCase()) ||
    seller.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cash-sellers-wrapper">
      <h2 className="title">💸 Nearby Cash Sellers</h2>

      <input
        type="text"
        className="search-box"
        placeholder="Search by name or area..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="seller-map-container">
        <MapContainer center={[31.5, 34.47]} zoom={12} style={{ height: '300px', width: '100%', borderRadius: '10px', marginBottom: '20px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          {filteredSellers.map((seller, i) => (
            <Marker key={i} position={seller.position}>
              <Popup>
                <strong>{seller.name}</strong><br />
                Rate: ₪{seller.rate}/USD<br />
                Cash: {seller.cashAvailable}<br />
                Status: {seller.availability}<br />
                Area: {seller.area}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ul className="seller-list">
        {filteredSellers.map((seller, i) => (
          <li key={i} className={`seller-card ${seller.availability === 'Open' ? 'available' : 'unavailable'}`}>
            <h3>{seller.name} {seller.verified && <span className="verified">✔</span>}</h3>
            <p><strong>Rate:</strong> ₪{seller.rate}/USD</p>
            <p><strong>Cash:</strong> {seller.cashAvailable}</p>
            <p><strong>Status:</strong> {seller.availability}</p>
            <p><strong>Distance:</strong> {seller.distance}</p>
            <p><strong>Area:</strong> {seller.area}</p>
          </li>
        ))}
      </ul>

      <div className="back-button">
        <Link to="/">← Back to Wallet</Link>
      </div>
    </div>
  );
}

export default CashSellers;
