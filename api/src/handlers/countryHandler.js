const {
  getAllCountries,
  getAllCountriesByName,
  getAllCountriesById,
} = require("../controllers/countryControllers");

/* 
*pagination*
const getCountryHandler = async (req, res) => {
  const { name, page, limit } = req.query;

  try {
    const results = name
      ? await getAllCountriesByName(name)
      : await getAllCountries(page, limit);

    if (results.length === 0) {
      throw new Error("Error country not found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getCountryHandler", message: error.message });
  }
}; */

const getCountryHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name
      ? await getAllCountriesByName(name)
      : await getAllCountries();

    if (results.length === 0) {
      throw new Error("Error country not found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getCountryHandler", message: error.message });
  }
};

const getCountryHandlerId = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const country = await getAllCountriesById(id, source);
    res.status(201).json(country);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error countryHandlerId", message: error.message });
  }
};

module.exports = {
  getCountryHandler,
  getCountryHandlerId,
};
