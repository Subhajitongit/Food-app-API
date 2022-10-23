const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

//get all reviews
module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    let data = await reviewModel.find();
    if (data) {
      res.json({
        message: "Succesful",
        data: data,
      });
    } else {
      res.json({
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//get top 3 reviews
module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    let data = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (data) {
      res.json({
        message: "Succesful",
        data: data,
      });
    } else {
      res.json({
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//get plan reviews
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planid = req.params.id;
    let reviews = await reviewModel.find();

    reviews = reviews.filter((review) => review.plan._id == planid);

    res.json({
      message: "Successful",
      data: reviews,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//create review
module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let data = req.body;
    await reviewModel.create(data);
    plan.ratingAverage = (data.rating + plan.ratingAverage) / 2;
    await plan.save();
    res.json({
      message: "Successful",
      data: data,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//update review
module.exports.updateReview = async function updateReview(req, res) {
  try {
    let id = req.params.id;
    let data = req.body;

    let keys = [];

    for (let key in data) {
      keys.push(key);
    }

    let review = await reviewModel.findById(id);

    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = data[keys[i]];
    }

    await review.save();

    res.json({
      message: "Successfull",
      data: review,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//delete review
module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let id = req.params.id;
    let data = await reviewModel.findByIdAndDelete(id);
    res.json({
      message: "Review deleted",
      data: data,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
