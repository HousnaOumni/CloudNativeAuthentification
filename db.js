const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ClassAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("working");
  })
  .catch((err) => console.log(err));
