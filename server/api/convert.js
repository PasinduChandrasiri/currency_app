const axios = require("axios");

export default async function handler(req, res) {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;
  const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=23f3cc13db8e4e808a99c31260300f90`;

  try {
    const response = await axios.get(dataUrl);
    const rates = response.data.rates;
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    res.status(200).json(targetAmount.toFixed(2));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to convert currency" });
  }
}
