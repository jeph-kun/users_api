const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  //Check if there is a token
  !token &&
    res
      .status(401)
      .send({ message: "Unauthorized Access: Please register to proceed" });

  //Check if the token is valid
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).send({ message: "BAD TOKEN" });
  }
};

module.exports = authToken;
