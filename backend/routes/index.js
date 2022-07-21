const express = require("express");
const router = express.Router();

const currentUserRouter = require("./current-user");
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const imagesRouter = require("./images");

const { User } = require("../db/models");

const { setTokenCookie, restoreUser, requireAuth } = require("../utils/auth");
const { validateSignup, validateLogin } = require("../utils/validation");
const { checkUserExists } = require("../utils/existance-check");

router.use("/me", currentUserRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/images", imagesRouter);

// SIGN UP USER
router.post(
  "/signup",
  validateSignup,
  checkUserExists,
  async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.signup(firstName, lastName, email, password);

    const token = setTokenCookie(res, user);
    user.dataValues["token"] = token;

    res.json(user);
  }
);

// LOGIN USER
router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    return next(err);
  }

  const token = setTokenCookie(res, user);
  user.dataValues["token"] = token;
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
