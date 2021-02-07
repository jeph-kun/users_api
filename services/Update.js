const Users = require("../models/Users");

module.exports = async (userID, updatedInfo) => {
  try {
    await Users.updateOne({ _id: userID }, { $set: updatedInfo });
    return true;
  } catch (error) {
    return false;
  }
};
