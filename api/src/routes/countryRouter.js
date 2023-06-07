const { Router } = require("express");
const {
  getCountryHandler,
  getCountryHandlerId,
} = require("../handlers/countryHandler");

const countryRouter = Router();

countryRouter.get("/", getCountryHandler);

countryRouter.get("/:id", getCountryHandlerId);

module.exports = countryRouter;
