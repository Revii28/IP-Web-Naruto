const { User } = require("../models");

async function authorization(req, res, next) {
  let userId = req.user.id;
  let paramId = req.params.id;
  try {
    let data = await User.findByPk(paramId);
    if (!data) {
      throw { name: "User not found." };
    }

    if (req.user.role === "Admin") {
      next();
      return;
    }

    if (data.id !== userId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

async function checkAdmin(req, res, next) {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

module.exports = { authorization, checkAdmin };
