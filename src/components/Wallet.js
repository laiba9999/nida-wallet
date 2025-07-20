import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

function Wallet() {
  const [walletBalance] = useState(250.75);
  const navigate = useNavigate();

  return (
    <div className="wallet-container">
      <header>
        <h1>Nidā’ Wallet</h1>
        <p>Empowering digital aid in Gaza</p>
      </header>

      <section className="balance-box">
        <h2>Wallet Balance</h2>
        <p className="balance">₪ {walletBalance.toFixed(2)}</p>
      </section>

      <section className="wallet-buttons">
        <button onClick={() => navigate('/cash-sellers')}>💸 View Cash Sellers Nearby</button>
        <button onClick={() => navigate('/vendors')}>🛍️ View Local Vendors on Map</button>
      </section>
    </div>
  );
}

export default Wallet;