const Users = require("../models/Users");

module.exports = async (userID) => {
  try {
    const result = await Users.findById(userID).select("-password");
    return result;
  } catch (error) {
    return "Account Not Found";
  }
};
