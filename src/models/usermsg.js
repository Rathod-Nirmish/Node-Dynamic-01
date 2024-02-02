const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "email is already in use"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  msg: {
    type: String,
    required: true,
    trim: true,
  },
  date : {
    type: Date,
    default : Date.now
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;