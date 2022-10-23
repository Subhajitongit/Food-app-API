const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const {
  protectedRoute,
  login,
  signup,
  isAuthorised,
  forgetPassword,
  resetPassword,
  logout,
} = require("../Controllers/authController");

//user specific functions
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/forgetpassword").post(forgetPassword);

userRouter.route("/resetpassword").post(resetPassword);

//user profile function
userRouter.use(protectedRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUsers);

module.exports = userRouter;
