const { Router } = require("express");
const {
  postCreateActivity,
  getActivityHandler,
  EndActivityHandler,
  UpdateActivityHandler,
  getActivitiesHandlerId,
} = require("../handlers/activityHandler");
const { postValidate } = require("../middlewares/postValidate");

const activityRouter = Router();

activityRouter
  .route("/")
  .get(getActivityHandler)
  .post(postValidate, postCreateActivity)
  .delete(EndActivityHandler)
  .put(UpdateActivityHandler);

activityRouter.get("/:id", getActivitiesHandlerId);

module.exports = activityRouter;
