import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useUserLocation } from './useUserLocation';
import ExchangeRateWidget from './ExchangeRateWidget';
import 'leaflet/dist/leaflet.css';
import './VendorMap.css';
import L from 'leaflet';

// Fix Leaflet icon paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Dummy vendor data
const vendors = [
  {
    name: 'Fatima Ali',
    shop: 'Fatima’s Food Market',
    category: 'Groceries',
    stock: ['Rice – ₪15/kg', 'Oil – ₪20/litre'],
    address: 'Al-Rimal, Gaza City',
    position: [31.506, 34.466],
    available: true,
  },
  {
    name: 'Layla Hassan',
    shop: 'Layla’s Essentials',
    category: 'Household Goods',
    stock: ['Soap – ₪5/bar', 'Laundry Detergent – ₪25/bottle', 'Toilet Paper – ₪10/pack'],
    address: 'Al-Shati Camp, Gaza City',
    position: [31.533, 34.448],
    available: false,
  },
  {
    name: 'Yousef Barakat',
    shop: 'Barakat Bakery',
    category: 'Bakery',
    stock: ['Pita Bread – ₪3/pack', 'Baklava – ₪15/box'],
    address: 'Zeitoun Neighborhood, Gaza',
    position: [31.505, 34.475],
    available: true,
  },
  {
    name: 'Huda Nassar',
    shop: 'Huda’s Clothing Boutique',
    category: 'Clothing',
    stock: ['Hijabs – ₪25 each', 'Children’s Dresses – ₪40', 'Shirts – ₪30'],
    address: 'Khan Younis City Center',
    position: [31.340, 34.305],
    available: true,
  },
  {
    name: 'Abu Ahmed',
    shop: 'Southern Produce Market',
    category: 'Fresh Produce',
    stock: ['Tomatoes – ₪6/kg', 'Cucumbers – ₪4/kg', 'Watermelons – ₪12 each'],
    address: 'Khan Younis Agricultural District',
    position: [31.343, 34.306],
    available: false,
  },
  {
    name: 'Nour Electric',
    shop: 'Nour’s Power Shop',
    category: 'Electronics',
    stock: ['Lightbulbs – ₪5', 'Extension Cords – ₪18'],
    address: 'Eastern Khan Younis',
    position: [31.345, 34.315],
    available: true,
  },
  {
    name: 'Mariam Odeh',
    shop: 'Mariam’s Mobile Accessories',
    category: 'Electronics',
    stock: ['Phone Covers – ₪15', 'Power Banks – ₪60'],
    address: 'Al-Daraj, Gaza City',
    position: [31.517, 34.463],
    available: false,
  },
  {
    name: 'Ibrahim’s Shoes',
    shop: 'Step Right',
    category: 'Footwear',
    stock: ['Sandals – ₪35', 'Sneakers – ₪80'],
    address: 'Tal al-Hawa, Gaza City',
    position: [31.489, 34.436],
    available: true,
  },
  {
    name: 'Rana Taha',
    shop: 'Rana’s Home Essentials',
    category: 'Household Items',
    stock: ['Blankets – ₪50', 'Towels – ₪20'],
    address: 'Sheikh Radwan, Gaza City',
    position: [31.530, 34.470],
    available: true,
  },
  {
    name: 'Osama’s Snacks',
    shop: 'Osama Mini Mart',
    category: 'Groceries',
    stock: ['Biscuits – ₪4', 'Juice – ₪3'],
    address: 'Beach Camp, Gaza City',
    position: [31.537, 34.455],
    available: true,
  },
  {
    name: 'Mohammed Saleh',
    shop: 'Tech Corner',
    category: 'Electronics',
    stock: ['Chargers – ₪30', 'Headphones – ₪50'],
    address: "Shuja'iyya District",
    position: [31.520, 34.487],
    available: false,
  },
];

function ResizeMapOnExpand({ expanded }) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [expanded, map]);

  return null;
}

function VendorMap() {
  const userLocation = useUserLocation();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMapSize = () => setExpanded(prev => !prev);

  const filteredVendors = vendors.filter(vendor => {
    const query = searchQuery.toLowerCase();
    return (
      vendor.name.toLowerCase().includes(query) ||
      vendor.shop.toLowerCase().includes(query) ||
      vendor.stock.some(item => item.toLowerCase().includes(query))
    );
  });

  return (
    <div className="vendor-map-wrapper">
      <h2 className="vendor-title">🗺️ Gaza Vendors Map</h2>

      <input
        type="text"
        placeholder="Search by vendor, shop, or item..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '10px', width: '80%', maxWidth: '400px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      />

      <div
        className={expanded ? 'map-container expanded' : 'map-container collapsed'}
        onClickCapture={(e) => {
          const isLeafletElement = e.target.closest('.leaflet-popup') || e.target.closest('.leaflet-marker-icon');
          if (!isLeafletElement) {
            toggleMapSize();
          }
        }}
      >
        <MapContainer
          center={userLocation || [31.5, 34.47]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          dragging={expanded}
          zoomControl={expanded}
        >
          <ResizeMapOnExpand expanded={expanded} />

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap & CartoDB"
          />

          {filteredVendors.map((vendor, i) => (
            <Marker key={i} position={vendor.position}>
              <Popup>
                <strong>{vendor.shop}</strong><br />
                Vendor: {vendor.name}<br />
                Category: {vendor.category}<br />
                <span style={{ color: vendor.available ? 'green' : 'red', fontWeight: 'bold' }}>
                  {vendor.available ? '🟢 Available' : '🔴 Unavailable'}
                </span><br />
                Stock:
                <ul>{vendor.stock.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
                Address: {vendor.address}
              </Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <ExchangeRateWidget />

      <div className="back-button">
        <Link to="/">← Back to Wallet</Link>
      </div>
    </div>
  );
}

export default VendorMap;
