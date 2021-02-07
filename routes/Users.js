const express = require("express");
const router = express.Router();

//Database Functions
const CreateService = require("../services/Create");
const GetService = require("../services/Get");
const UpdateService = require("../services/Update");
const DeleteService = require("../services/Delete");
const GetUserInfo = require("../services/GetUser");

//Encryption Methods
const EncryptPass = require("../utils/encrpyt");
const DecryptPass = require("../utils/decrypt");

//Authentication Methods
const GenToken = require("../utils/genToken");
const AuthToken = require("../utils/authToken");

//@PUBLIC ROUTES
router.post("/create", async (req, res) => {
  const { userOBJ } = req.body;
  const encyptedPass = await EncryptPass(userOBJ.password); //Encrypt the Password

  //Check if the Encyption is successfull
  if (!encyptedPass) {
    res.status(500).send({
      status: encyptedPass,
      message: "There was a problem in the encyption",
    });
  } else {
    const encyptedInfo = { ...userOBJ, password: encyptedPass }; //Update the object with the hashed password
    const results = await CreateService(encyptedInfo);

    if (results) {
      res.status(200).send({
        status: results,
        message: "Account Created",
      });
    } else {
      res.status(500).send({
        status: results,
        message: "There was a problem adding the account",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const {
    userOBJ: { username, password },
  } = req.body;

  const results = await GetService(username);

  if (results) {
    //decrypt the password from db and compare //return boolean
    const decryptedPass = await DecryptPass(password, results.password);

    if (decryptedPass) {
      //Generate Token
      const userToken = await GenToken(results._id);

      //Check if the GenToken was successfull
      !userToken
        ? res.status(500).send({ message: "Cannot Create a Token" })
        : res.status(200).send({
            token: userToken,
            user_info: {
              _id: results._id,
              username: results.username,
            },
          });
    } else {
      res.status(400).send({ message: "Wrong Password" });
    }
  } else {
    res.status(400).send({
      message: "Invalid Credentials",
    });
  }
});

//@PRIVATE ROUTES

router.post("/delete", AuthToken, async (req, res) => {
  const { userID } = req.body;

  const results = await DeleteService(userID);

  if (results) {
    res.status(200).send({
      status: results,
      message: "User was deleted",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "There was an error deleting the user",
    });
  }
});

router.post("/update", async (req, res) => {
  const { userID, updatedInfo } = req.body;

  const results = await UpdateService(userID, updatedInfo);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Update Successfull",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "There was an error updating",
    });
  }
});

router.get("/get_user_info", AuthToken, async (req, res) => {
  const results = await GetUserInfo(req.user.user_id);

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(400).send({
      retrieveStatus: results,
      message: "There must be a problem in the token",
    });
  }
});

module.exports = router;
