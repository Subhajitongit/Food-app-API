const jwt = require("jsonwebtoken");
const JWT_KEY = "nfa543gvaf31gae3r";

async function protectedRoute(req, res, next) {
  let flag = req.cookies.logIn;

  if (flag) {
    let isVerified = jwt.verify(flag, JWT_KEY);

    if (isVerified) {
      next();
    } else {
      return res.json({
        message: "User isn't authenticated",
      });
    }
  } else {
    return res.json({
      message: "Operation not allowed!",
    });
  }
}

module.exports = protectedRoute;
