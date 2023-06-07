const { createActivity } = require("../controllers/createActivityController");
const {
  getAllActivities,
  getAllActivitiesByName,
  updateActivity,
  getAllActivitysById,
} = require("../controllers/getAllActivitiesController");
const { Activity, Country } = require("../db");

const getActivityHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name
      ? await getAllActivitiesByName(name)
      : await getAllActivities();

    if (results.length === 0) {
      throw new Error("Error activity not found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getActivityHandler", message: error.message });
  }
};

const getActivitiesHandlerId = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await getAllActivitysById(id);
    res.status(201).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getActivitiesHandlerId", message: error.message });
  }
};

const postCreateActivity = async (req, res) => {
  try {
    const newActivity = await createActivity(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "Error postCreateActivity", message: error.message });
  }
};

const EndActivityHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const activityToDelete = await Activity.findOne({
      where: {
        name: name,
      },
    });

    if (!activityToDelete) {
      throw new Error("Activity not found");
    }

    await activityToDelete.destroy();

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting activity", message: error.message });
  }
};

const UpdateActivityHandler = async (req, res) => {
  try {
    const { id, name, difficulty, duration, season, image, countries } =
      req.body;

    if (!id) throw Error("Id must be provided");

    const activity = updateActivity(
      id,
      name,
      difficulty,
      duration,
      season,
      image,
      countries
    );

    if (activity.error) throw Error(activity.error);

    return res.status(200).json({ message: "Activity updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating Activity", message: error.message });
  }
};

module.exports = {
  postCreateActivity,
  getActivityHandler,
  EndActivityHandler,
  UpdateActivityHandler,
  getActivitiesHandlerId,
};
