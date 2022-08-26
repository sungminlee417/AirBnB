const express = require("express");
const router = express.Router();

const currentUserRouter = require("./current-user");
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const imagesRouter = require("./images");
const apiRouter = require("./api");

const { User } = require("../db/models");

const { setTokenCookie, restoreUser, requireAuth } = require("../utils/auth");
const { validateSignup, validateLogin } = require("../utils/validation");
const { checkUserExists } = require("../utils/existance-check");

router.use("/me", currentUserRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/images", imagesRouter);
router.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.json({});
  });
}

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

module.exports = router;
