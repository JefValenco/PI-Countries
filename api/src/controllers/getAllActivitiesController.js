const axios = require("axios");
const { Activity, Country } = require("../db");
const url = require("../data");
const { Op } = require("sequelize");

/* 
This one is countries outside of an array is the one we been using untis the filtering thing with thehome
 */
const getAllActivities = async () => {
  const dataDB = await Activity.findAll({ include: Country });

  const dataBaseCountries = dataDB?.map((element) => {
    const countries = element.dataValues.countries
      .map((country) => country.name)
      .join(", ");

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      difficulty: element.dataValues.difficulty,
      duration: element.dataValues.duration,
      season: element.dataValues.season,
      image: element.dataValues.image,
      countries,
    };
  });

  return dataBaseCountries;
};

/* const getAllActivities = async () => {
  const dataDB = await Activity.findAll({ include: Country });

  const dataBaseCountries = dataDB?.map((element) => {
    const countries = element.dataValues.countries.map(
      (country) => country.name
    );

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      difficulty: element.dataValues.difficulty,
      duration: element.dataValues.duration,
      season: element.dataValues.season,
      image: element.dataValues.image,
      countries,
    };
  });

  return dataBaseCountries;
}; */

const getAllActivitiesByName = async (name) => {
  console.log("searching for name:", name);
  const dataBaseCountries = await Activity.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  return dataBaseCountries;
};

const getAllActivitysById = async (id) => {
  console.log("searching for id:", id);
  activity = await Activity.findByPk(id, { include: Country });

  return activity;
};
const updateActivity = async (
  id,
  name,
  difficulty,
  duration,
  season,
  image,
  countries
) => {
  const activity = await getAllActivitysById(id);

  if (!activity) return activity;

  activity.name = name || activity.name;
  activity.difficulty = difficulty || activity.difficulty;
  activity.duration = duration || activity.duration;
  activity.season = season || activity.season;
  activity.image = image || activity.image;

  if (countries) {
    const existingCountries = await activity.getCountries();
    await activity.removeCountries(existingCountries);

    const allCountries = await Country.findAll({
      where: { name: countries },
    });

    await activity.setCountries(allCountries);
  }

  await activity.save();

  return activity;
};

module.exports = {
  getAllActivities,
  getAllActivitiesByName,
  updateActivity,
  getAllActivitysById,
};
