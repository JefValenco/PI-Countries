const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const url = require("../data");

const getAllCountries = async () => {
  const apiCountries = url;
  /*  const apiCountries = (


    await axios.get(`https://rest-countries.up.railway.app/v3/all 
      `)
  ).data.map((element) => {
    return {
      id: String(element.cca3),

      name: element.name.common,
      continents: Array.isArray(element.continents)
        ? element.continents.join(", ")
        : element.continents,
      capital: String(
        Array.isArray(element.capital)
          ? element.capital.join(", ")
          : element.capital
      ),
      subregion: String(element.subregion),
      area: String(element.area),
      population: String(element.population),
      image: element.flags[0],
    };
  }); */ /* This API stopped working so thstá why I am using internal data */

  const promises = apiCountries.map(async (element) => {
    const [country, created] = await Country.findOrCreate({
      where: {
        id: element.id,
      },
      defaults: {
        name: element.name,
        continents: element.continents,
        capital: element.capital,
        subregion: element.subregion,
        area: element.area,
        population: element.population,
        image: element.image,
      },
    });
    return country;
  });

  const countrys = await Promise.all(promises);
  return countrys;
};

const getAllCountriesByName = async (name) => {
  console.log("searching for name:", name);
  const dataBaseCountries = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  return dataBaseCountries;
};

const getAllCountriesById = async (id, source) => {
  console.log("searching for id:", id);
  const dataBaseCountries = await Country.findAll({
    where: { id: { [Op.iLike]: `%${id}%` } },
    include: Activity, // Include the "Activity" model to retrieve associated activities
  });

  return dataBaseCountries;
};

module.exports = {
  getAllCountries,
  getAllCountriesByName,
  getAllCountriesById,
};
