const express = require("express");
const router = express.Router(); //router object
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

// SignUp GET route
router.get("/signup", userController.renderSignupForm);

// SignUp POST route
router.post(
  "/signup",
  wrapAsync(userController.signup),
);

// Login GET route
router.get("/login", userController.renderLoginForm);

// Login POST route: // passport.authenticate() is middleware by passport
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// Logout GET route
router.get("/logout", userController.logout);

module.exports = router;
