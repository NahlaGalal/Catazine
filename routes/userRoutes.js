const express = require("express");
const { check, body } = require("express-validator");

const userController = require("../Controllers/UserControllers");
const User = require("../Models/Users");

const router = express.Router();

router.get("/signup", userController.getSignup);

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("يجب أن يحتوي الاسم على 3 حروف على الأقل"),
    check("mail")
      .isEmail()
      .withMessage("من فضلك ادخل البريد الالكتروني صحيح")
      .custom(mail =>
        User.findOne({ mail }).then(user => {
          if (user) return Promise.reject("الايميل الذي ادخلته موجود مسبقا");
        })
      )
      .normalizeEmail(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("يجب ان تحتوي كلمة المرور على 8 احرف على الأقل")
      .trim(),
    check("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error("يجب ان تكون كلمات المرور متطابقة");
        return true;
      }),
    check(["facebook", "twitter", "google"])
      .isURL()
      .withMessage("من فضلك ادخل اللينك صحيح")
  ],
  userController.postSignup
);

router.get("/login", userController.getLogin);

router.post(
  "/login",
  [
    check("mail")
      .isEmail()
      .withMessage("من فضلك ادخل البريد الالكتروني صحبح")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("يجب ان تحتوي كلمة المرور على 8 احرف على الأقل")
      .trim()
  ],
  userController.postLogin
);

module.exports = router;
