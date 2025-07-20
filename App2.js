// Required packages:
// - react
// - axios
// - react-modal
// - react-leaflet or google-maps-react (for real maps, if needed)
// This is a simplified mock UI with fake data for demonstration.

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [walletBalance, setWalletBalance] = useState(250.75); // Mocked
  const [showSellersModal, setShowSellersModal] = useState(false);
  const [showVendorsModal, setShowVendorsModal] = useState(false);

  // Mock data
  const sellers = [
    { name: 'Ahmed Cash Point', rate: 3.05, distance: '1.2 km' },
    { name: 'Nour Money Exchange', rate: 3.00, distance: '2.5 km' },
  ];

  const vendors = [
    { name: 'Al-Nour Grocery', category: 'Food', distance: '0.8 km' },
    { name: 'Gaza Pharmacy', category: 'Health', distance: '1.5 km' },
  ];

  return (
    <div className="app-container">
      <header>
        <h1>Nidā’ Wallet</h1>
      </header>
      <div className="wallet-box">
        <h2>Wallet Balance</h2>
        <p>₪ {walletBalance.toFixed(2)}</p>
      </div>
      <div className="button-group">
        <button onClick={() => setShowSellersModal(true)}>View Cash Sellers Nearby</button>
        <button onClick={() => setShowVendorsModal(true)}>View Local Vendors</button>
      </div>

      <Modal
        isOpen={showSellersModal}
        onRequestClose={() => setShowSellersModal(false)}
        contentLabel="Cash Sellers"
        className="modal"
      >
        <h2>Cash Liquidity Sellers</h2>
        <ul>
          {sellers.map((seller, idx) => (
            <li key={idx}>
              {seller.name} – ₪{seller.rate}/USD – {seller.distance} away
            </li>
          ))}
        </ul>
        <button onClick={() => setShowSellersModal(false)}>Close</button>
      </Modal>

      <Modal
        isOpen={showVendorsModal}
        onRequestClose={() => setShowVendorsModal(false)}
        contentLabel="Vendors"
        className="modal"
      >
        <h2>Vendors Accepting Wallet Payments</h2>
        <ul>
          {vendors.map((vendor, idx) => (
            <li key={idx}>
              {vendor.name} – {vendor.category} – {vendor.distance} away
            </li>
          ))}
        </ul>
        <button onClick={() => setShowVendorsModal(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
