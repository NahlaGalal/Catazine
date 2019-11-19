const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../Models/Users");
const Article = require("../Models/articles");
const Comment = require("../Models/comment");

exports.getSignup = (req, res, next) =>
  res.render("signup", {
    title: "Signup",
    docType: "/signup",
    errorMessage: "",
    errorInput: "",
    oldInput: {
      name: "",
      mail: "",
      password: "",
      confirmPassword: "",
      facebook: "",
      twitter: "",
      google: ""
    }
  });

exports.postSignup = (req, res, next) => {
  const {
    name,
    mail,
    password,
    confirmPassword,
    facebook,
    twitter,
    google
  } = req.body;
  const errors = validationResult(req).array();
  if (errors.length) {
    return res.status(422).render("signup", {
      title: "Signup",
      docType: "/signup",
      errorMessage: errors[0].msg,
      errorInput: errors[0].param,
      oldInput: {
        name,
        mail,
        password,
        confirmPassword,
        facebook,
        twitter,
        google
      }
    });
  }
  const imageUrl = req.file ? req.file.path : "userImages\\user.png";
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const newUser = new User({
        name,
        mail,
        password: hashedPassword,
        imageUrl,
        team: "Developer",
        facebook,
        twitter,
        google
      });
      newUser.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) =>
  res.render("login", {
    title: "Login",
    docType: "/login",
    errorMessage: "",
    errorInput: "",
    oldInput: {
      mail: "",
      password: ""
    }
  });

exports.postLogin = (req, res, next) => {
  const { mail, password } = req.body;
  const errors = validationResult(req).array();
  if (errors.length) {
    return res.status(422).render("login", {
      title: "Login",
      docType: "/login",
      errorMessage: errors[0].msg,
      errorInput: errors[0].param,
      oldInput: {
        mail,
        password
      }
    });
  }
  User.findOne({ mail }).then(user => {
    if (!user) {
      return res.status(422).render("login", {
        title: "Login",
        docType: "/login",
        errorMessage: "Invalid e-mail or password",
        errorInput: "",
        oldInput: {
          mail,
          password
        }
      });
    }
    bcrypt
      .compare(password, user.password)
      .then(matching => {
        if (!matching) {
          return res.status(422).render("login", {
            title: "Login",
            docType: "/login",
            errorMessage: "Invalid e-mail or password",
            errorInput: "",
            oldInput: {
              mail,
              password
            }
          });
        }
        req.session.user = user;
        req.session.isAuthenticated = true;
        return req.session.save(err => {
          if (err) console.log(err);
          res.redirect("/");
        });
      })
      .catch(err => console.log(err));
  });
};