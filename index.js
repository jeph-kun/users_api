const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const usersRoute = require("./routes/Users");

app.use("/user", usersRoute);
mongoose.connect(`${process.env.DB_CONNECTION}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const port = 3001;

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
