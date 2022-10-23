const express = require("express");
const { protectedRoute } = require("../Controllers/authController");
const {
  getAllPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  getTop3Plans,
} = require("../Controllers/planController");

const planRouter = express.Router();

planRouter.route("/").post(createPlan);

planRouter.route("/topPlans").get(getTop3Plans);

planRouter.route("/allPlans").get(getAllPlans);

planRouter.route("/:id").delete(deletePlan).patch(updatePlan);

planRouter.use(protectedRoute);
planRouter.route("/:id").get(getPlan);

module.exports = planRouter;
