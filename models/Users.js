const mongoose = require("mongoose");
const Schema = mongoose.Schema; //declare a database structure

const UsersSchema = new Schema({
  //table structure
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UsersSchema); // "tablename in the db"
