const userModel = require("../models/userModel");

module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    let allUsers = await userModel.find();
    res.json({
      message: "Succesful",
      data: allUsers,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;

  let user = await userModel.findById(id);
  if (user) {
    return res.json({
      message: "Succesful",
      data: user,
    });
  } else {
    return res.json({
      message: "No such user found!",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  let id = req.params.id;

  try {
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;

    if (user) {
      let keys = [];

      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }

      const updatedUser = await user.save();

      res.json({
        message: "Succesful",
        data: updatedUser,
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;

    await userModel.findByIdAndDelete(id);

    res.json({ message: "Succesfully deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.createUser = async function createUser(req, res) {
  const data = req.body;
  await userModel.create(data);
  res.json({
    message: "Succesful",
    user: data,
  });
};

module.exports.getCookies = function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send(cookies);
};

module.exports.setCookies = function setCookies(req, res) {
  res.cookie("isPrime", false, {
    maxAge: 1000 * 60 * 60 * 25,
    httpOnly: true,
  });
  res.send("cookies has been set");
};
