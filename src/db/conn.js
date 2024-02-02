const mongoose = require("mongoose");

// database connection
mongoose
  .connect("mongodb://localhost:27017/Node-Dynamic")
  .then(() => console.log("connection successfully"))
  .catch((err) => console.log(err));
