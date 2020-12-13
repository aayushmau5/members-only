const User = require("../models/User");

const { body, validationResult } = require("express-validator");

exports.login_get = function (req, res, next) {
  res.render("login", {
    data: {
      email: "",
    },
    pageTitle: "Login",
    path: "/login",
    errors: null,
  });
};

exports.login_post = [
  body("email").trim().isEmail().withMessage("Invalid Email Format").escape(),
  body("password").trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", {
        data: {
          email: req.body.email,
        },
        errors: error.array(),
        pageTitle: "Login",
        path: "/login",
      });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);
      console.log(user);
      if (!user) {
        return res.render("login", {
          data: {
            email: req.body.email,
          },
          pageTitle: "Login",
          path: "/login",
          errors: [{ msg: "Email is not registered" }],
        });
      }
      // authenticate
      res.redirect("/");
    });
  },
];
