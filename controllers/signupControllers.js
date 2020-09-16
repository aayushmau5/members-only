const validator = require("express-validator");
const User = require("../models/User");

exports.signup_get = function (req, res, next) {
  res.render("signup");
};

exports.signup_post = [
  validator
    .body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Firstname must be specified"),
  validator
    .body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Lastname must be specified"),
  validator.body("email").isEmail().withMessage("Please enter a valid email"),
  validator
    .body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character long"),
  validator.sanitize("firstname").escape(),
  validator.sanitize("lastname").escape(),
  validator.sanitize("email").escape(),
  (req, res, next) => {
    console.log("Validation and sanitization done!");
    const error = validator.validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      res.render("signup", {
        data: null,
        keyerror: null,
        errors: error.array(),
      });
      return;
    }
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    user.save(function (err) {
      if (err) {
        if (err.code === 11000) {
          res.render("signup", {
            data: null,
            keyerror: "Email Already Registered",
            errors: null,
          });
          return;
        }
        return next(err);
      }
      console.log("Data saved to the DB.");
      res.redirect("/");
    });
  },
];
