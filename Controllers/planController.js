const planModel = require("../models/planModel");

//get all plans
module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    const plans = await planModel.find();
    if (plans) {
      console.log(plans);
      res.json({
        message: "Successful",
        data: plans,
      });
    } else {
      res.json({
        message: "No plans exist!",
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

//get individual plan
module.exports.getPlan = async function getPlan(req, res) {
  try {
    const id = req.params.id;
    const plan = await planModel.findById(id);
    if (plan) {
      console.log(plan);
      res.json({
        message: "Successful",
        data: plan,
      });
    } else {
      res.json({
        message: "No such plans exist!",
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

//create plan
module.exports.createPlan = async function createPlan(req, res) {
  try {
    const data = req.body;
    await planModel.create(data);
    res.json({
      message: "Plan created successfully",
      data: data,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//delete plan
module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    const id = req.params.id;
    const plan = await planModel.findByIdAndDelete(id);
    if (plan) {
      console.log(plan);
      res.json({
        message: "Successfully Deleted Plan",
        data: plan,
      });
    } else {
      res.json({
        message: "No such plans exist!",
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

//update plan
module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let data = req.body;

    let keys = [];
    for (let key in data) {
      keys.push(key);
    }

    let plan = await planModel.findById(id);

    if (plan) {
      for (let i = 0; i < keys.length; i++) {
        plan[keys[i]] = data[keys[i]];
      }

      await plan.save();

      res.json({
        message: "Data updated successfully!",
      });
    } else {
      res.json({
        message: "Plan not found!",
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

//top 3 plans
module.exports.getTop3Plans = async function getTop3Plans(req, res) {
  try {
    let plans = await planModel.find().sort({ ratingAverage: "desc" }).limit(3);
    return res.json({
      message: "Successfull",
      data: plans,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
