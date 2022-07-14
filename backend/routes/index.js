const express = require("express");
const router = express.Router();

const { User } = require("../db/models");
const apiRouter = require("./api");
const { setTokenCookie, restoreUser, requireAuth } = require("../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

router.use("/api", apiRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

router.post("/signup", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const possibleExistingUser = await User.findOne({ where: { email: email } });

  if (possibleExistingUser) {
    const err = new Error("User already exists");
    err.status = 403;
    err.errors = {
      email: "User with that email already exists",
    };
    next(err);
  }
  const user = await User.signup(firstName, lastName, email, password);

  setTokenCookie(res, user);

  res.json(user);
});

const validateLogin = [
  check("email").exists({ checkFalsy: true }).withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  console.log(user);

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    next(err);
  }

  setTokenCookie(res, user);

  res.json(user);
});

router.get("/me", [restoreUser, requireAuth], (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
