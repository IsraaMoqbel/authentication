

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// this will be our data base's data structure
const UserSchema = new Schema(
  {
    name: {type: String, required: true, min:3},
    email: {type: String, required: true, min:6},
    password: {type: String, required: true, min:6},
  },
);

module.exports = mongoose.model("User", UserSchema);