const express = require("express");
const { protectedRoute } = require("../Controllers/authController");
const {
  getAllReviews,
  top3reviews,
  getPlanReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../Controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3").get(top3reviews);

reviewRouter.route("/:id").get(getPlanReviews);

reviewRouter.use(protectedRoute);
reviewRouter.route("/:plan").post(createReview);

reviewRouter.route("/:id").patch(updateReview).delete(deleteReview);

module.exports = reviewRouter;
