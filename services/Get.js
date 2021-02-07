const Users = require("../models/Users");

module.exports = async (username) => {
  try {
    const result = await Users.findOne({ username });
    return result;
  } catch (error) {
    return "Account Not Found";
  }
};
