const { Activity, Country } = require("../db");

const createActivity = async (body) => {
  const { name, difficulty, duration, season, image, countries } = body;
  try {
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season.toLowerCase(),
      image: image,
    });

    /*     const allCountries = await Country.findAll({ where: { name: countries } });
    await newActivity.addCountry(allCountries);
 */

    const actiNames = Array.isArray(countries)
      ? countries
      : countries.split(",").map((country) => country.trim()); // Split the diets string if it's not an array
    const allCountries = await Country.findAll({ where: { name: actiNames } }); // Find all diets with the given names
    await newActivity.addCountry(allCountries);

    return newActivity;
  } catch (error) {
    throw new Error("Failed to create activity");
  }
};

module.exports = {
  createActivity,
};
