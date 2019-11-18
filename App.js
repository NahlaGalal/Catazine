const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userController = require("./Controllers/UserControllers");

userController(app);

app.set("view engine", "ejs");

app.use("/public", express.static("./public"));
// app.use("/Assets", express.static("./Assets"));
// app.use("/Css", express.static("./Css"));
// app.use("/Images", express.static("./Images"));
// app.use("/webfonts", express.static("./webfonts"));

mongoose
  .connect("mongodb://localhost/Catazine", { useNewUrlParser: true })
  .then(() => app.listen("3000"))
  .catch(err => console.log(err));