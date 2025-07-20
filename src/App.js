import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from './components/Wallet';
import VendorMap from './components/VendorMap';
import CashSellers from './components/CashSellers';
import ExchangeRateWidget from './components/ExchangeRateWidget';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="/vendors" element={<VendorMap />} />
        <Route path="/cash-sellers" element={<CashSellers />} /> {/* ✅ This is required */}
        <Route path="/exchange-rates" element={<ExchangeRateWidget />} /> {/* Optional, if you want to include the exchange rate widget */}
      </Routes>
    </Router>
  );
}

export default App;
