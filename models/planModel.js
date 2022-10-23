const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://Admin:L08T0ZdGSbOFl22E@food-app.shyxc2a.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function () {
    console.log("Plan DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Name shouldn't exceed 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratingAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "Discount shouldn't exceed price",
    ],
  },
});

const planModel = mongoose.model("planModel", planSchema);

module.exports = planModel;
