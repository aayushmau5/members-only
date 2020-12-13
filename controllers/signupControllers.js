const { body, validationResult } = require("express-validator");
const User = require("../models/User");

exports.signup_get = function (req, res, next) {
  res.render("signup", {
    data: {
      firstname: "",
      lastname: "",
      email: "",
    },
    pageTitle: "Signup",
    path: "/signup",
    errors: null,
  });
};

exports.signup_post = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Firstname must be specified")
    .escape(),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Lastname must be specified")
    .escape(),
  body("email").isEmail().withMessage("Please enter a valid email").escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character long"),
  (req, res, next) => {
    console.log("Validation and sanitization done!");
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.render("signup", {
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
        },
        errors: error.array(),
        pageTitle: "MembersOnly",
        path: "/signup",
      });
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
          return res.render("signup", {
            data: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
            },
            pageTitle: 'Signup',
            path: '/signup',
            errors: [{ msg: "Email Already Registered" }],
          });
        }
        return next(err);
      }
      console.log("Data saved to the DB.");
      res.redirect("/");
    });
  },
];
