const express = require("express");
const router = express.Router();

const currentUserRouter = require("./current-user");
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews");

const { User } = require("../db/models");
const { setTokenCookie, restoreUser, requireAuth } = require("../utils/auth");

const { validateSignup, validateLogin } = require("../utils/validation");

router.use("/me", currentUserRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);

// SIGN UP USER
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

// LOGIN USER
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

// RESTORE CSRF
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
