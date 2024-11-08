const axios = require("axios");

export default async function handler(req, res) {
  const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=23f3cc13db8e4e808a99c31260300f90";
  try {
    const response = await axios.get(nameURL);
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
}
