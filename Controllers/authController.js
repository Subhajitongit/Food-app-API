const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "nfa543gvaf31gae3r";

module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);

    res.json({
      message: "Succesfully Signed Up",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.login = async function login(req, res) {
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
};

module.exports.logout = async function logout(req, res) {
  res.cookie("logIn", "", { maxAge: 1 });
  res.json({ message: "Loged out successfully" });
};

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) === true) {
      next();
    } else {
      res.status(401).json({
        message: "User not allowed!",
      });
    }
  };
};

module.exports.protectedRoute = async function protectedRoute(req, res, next) {
  try {
    let token = req.cookies.logIn;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        let user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "User isn't authenticated",
        });
      }
    } else {
      res.json({
        message: "User is not logged in",
      });
    }
  } catch {
    return res.json({
      message: "Operation not allowed!",
    });
  }
};

module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
    } else {
      return res.json({
        message: "User not registered!",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  let { password, confirmPassword } = req.body;
  const token = req.params.token;

  try {
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "Password reset successfully",
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
