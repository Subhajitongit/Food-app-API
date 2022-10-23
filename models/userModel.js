const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db_link =
  "mongodb+srv://Admin:L08T0ZdGSbOFl22E@food-app.shyxc2a.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("User DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: function () {
      return this.password === this.confirmPassword;
    },
  },
  role: {
    type: String,
    enum: ["admin", "owner", "user"],
    default: "user",
  },
  profilePictue: {
    type: String,
    default: "https://picsum.photos/200",
  },
  resetToken: String,
});

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
  console.log("Before saving in DB", this);
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedPassword = await bcrypt.hash(this.password, salt);
//   console.log(hashedPassword);
//   this.password = hashedPassword;
// });

userSchema.post("save", function (doc) {
  console.log("After saving in DB", doc);
});

userSchema.methods.createResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password,confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
}

//Model for the user--------------------------------------------------
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
