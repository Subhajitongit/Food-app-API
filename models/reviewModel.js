const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://Admin:L08T0ZdGSbOFl22E@food-app.shyxc2a.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function () {
    console.log("Review DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: true,
  },
});

//works with find, findOne, findByID
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;
