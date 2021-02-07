const Users = require("../models/Users");

module.exports = async (userObj) => {
  try {
    await Users.insertMany(userObj);
    return true;
  } catch (error) {
    return false;
  }
};
