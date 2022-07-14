const express = require("express");
const router = express.Router();

const { User } = require("../db/models");
const apiRouter = require("./api");
const { setTokenCookie } = require("../utils/auth");

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
  if (
    User.findOne({
      where: { email: email },
    })
  ) {
    const err = new Error("User already exists");
    err.status = 403;
    err.errors = {
      email: "User with that email already exists",
    };
    next(err);
  }
  const user = await User.signup({ firstName, lastName, email, password });
  setTokenCookie(res, user);
  res.json(user);
});

module.exports = router;
