const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userID) => {
  const token = jwt.sign(
    { user_id: userID, access_key: process.env.API_ACCESS_KEY },
    process.env.JWT_SECRET,
    {
      expiresIn: 3000,
    }
  );

  return token;
};

module.exports = generateToken;
