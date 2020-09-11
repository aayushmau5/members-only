const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupControllers");
const loginController = require("../controllers/loginControllers");

router.get("/", (req, res) => res.render("index"));
router.get("/signup", signupController.signup_get);
router.post("/signup", signupController.signup_post);
router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);

module.exports = router;
