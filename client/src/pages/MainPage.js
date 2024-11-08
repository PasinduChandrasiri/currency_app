import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/background-small.png';

export default function MainPage() {
  // States for the form fields
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/api/convert", {
        params: { date, sourceCurrency, targetCurrency, amountInSourceCurrency },
      });

      setAmountInTargetCurrency(response.data.result);  // Assuming response.data.result
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Fetch all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get("/api/getAllCurrencies");
        setCurrencyNames(response.data); // Assuming an array of currency objects
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
        }}>
        <h1 className="lg:mx-32 text-5xl font-bold text-green-500">Convert Your Currencies Today</h1>
        <p className="lg:mx-32 py-6 text-black">
          "Convert Your Currencies Today simplifies currency conversion for all your needs..."
        </p>
        <div className="mt-5 flex items-center justify-center flex-col">
          <section className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit}>
              {/* Date */}
              <div className="mb-4">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Date
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  className="..."
                  required
                />
              </div>

              {/* Source Currency */}
              <div className="mb-4">
                <label htmlFor="sourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Source Currency
                </label>
                <select
                  onChange={(e) => setSourceCurrency(e.target.value)}
                  name="sourceCurrency"
                  id="sourceCurrency"
                  value={sourceCurrency}
                  className="..."
                >
                  <option value="">Select the source currency</option>
                  {currencyNames.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Currency */}
              <div className="mb-4">
                <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Target Currency
                </label>
                <select
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  name="targetCurrency"
                  id="targetCurrency"
                  value={targetCurrency}
                  className="..."
                >
                  <option value="">Select the target currency</option>
                  {currencyNames.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount in Source Currency */}
              <div className="mb-4">
                <label htmlFor="amountInSourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Amount in Source Currency
                </label>
                <input
                  onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                  type="number"
                  id="amountInSourceCurrency"
                  name="amountInSourceCurrency"
                  value={amountInSourceCurrency}
                  className="..."
                  placeholder="Enter amount in source currency"
                  required
                />
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
                Get the target currency
              </button>
            </form>
          </section>
        </div>

        {!loading ? (
          <section className="mt-5 lg:mx-72 text-black">
            {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to{" "}
            <span className="text-green-500 font-bold">{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]}
          </section>
        ) : <p>Loading...</p>}
      </div>
    </div>
  );
}
