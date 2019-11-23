const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
// Routes
const userRoutes = require("./routes/userRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const membersRoutes = require("./routes/membersRoutes");
const generalRoutes = require("./routes/generalRoutes");
// Models
const User = require("./Models/Users");

const MONGODB_URL = "mongodb://localhost/Catazine";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "Image")
      return cb(null, "userImages");
    else
      return cb(null, "articleImages")
  },
  filename: (req, file, cb) =>
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    )
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else cb(null, false);
};
// app.use(multer({ storage, fileFilter }).single("articleImage"));
app.use(multer({ storage, fileFilter }).fields([{name: "image"}, {name: "articleImage"}]));

// Sessions
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions"
});
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store
  })
);
app.use((req, res, next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) return next();
      req.user = user;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
});

// CSRF
const csrfProtection = csrf();
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// flash
app.use(flash());

// Static files
app.use("/public", express.static("./public"));
app.use("/userImages", express.static("./userImages"));
app.use("/articleImages", express.static("./articleImages"));

// Routes
app.use(userRoutes);
app.use(articlesRoutes);
app.use(membersRoutes);
app.use(generalRoutes);

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => app.listen("3000"))
  .catch(err => console.log(err));

// TODO: Forms ==> edit articles
// TODO: User navbar
// TODO: Images in articles
// TODO: Select month in Articles view