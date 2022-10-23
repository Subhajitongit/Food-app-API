const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "nfa543gvaf31gae3r";

const authRouter = express.Router();

authRouter.route("/signup").get(middleware, signup).post();

authRouter.route("/login").post(login);

function middleware(req, res, next) {
  console.log("Middleware encountered");
  next();
}

function signup(req, res) {
  res.json({ message: "Sign Up" });
}

async function login(req, res) {
  let data = req.body;

  try {
    let user = await userModel.findOne({ email: data.email });

    if (user.password === data.password) {
      let uid = user._id;
      let token = jwt.sign({ payload: uid }, JWT_KEY);

      res.cookie("logIn", token, {
        httpOnly: true,
      });

      return res.json({ message: "Login Success", data: data });
    } else {
      return res.json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err });
  }
}

module.exports = authRouter;
