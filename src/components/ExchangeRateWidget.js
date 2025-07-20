// src/components/ExchangeRateWidget.js
import React, { useEffect, useState } from 'react';
import './ExchangeRateWidget.css';

function ExchangeRateWidget() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=ILS,JOD,EUR');
        const data = await res.json();

        if (data && data.rates) {
          setRates({
            'USD → ILS': data.rates.ILS,
            'USD → JOD': data.rates.JOD,
            'USD → EUR': data.rates.EUR,
          });
        } else {
          setError(true);
        }

      } catch (err) {
        console.error('Error fetching exchange rates:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  return (
    <div className="exchange-rate-widget">
      <h3>💱 Live Exchange Rates</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error || !rates ? (
        <p>Unable to load exchange rates.</p>
      ) : (
        <ul>
          {Object.entries(rates).map(([label, rate], i) => (
            <li key={i}>
              <strong>{label}:</strong> {rate.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExchangeRateWidget;
