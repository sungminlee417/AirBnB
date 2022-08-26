const express = require("express");
const router = express.Router();

const sessionRouter = require("./session");
const currentUserRouter = require("./current-user");
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const imagesRouter = require("./images");
const apiRouter = require("./api");

router.use("/", sessionRouter);
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

module.exports = router;
