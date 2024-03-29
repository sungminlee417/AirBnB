const express = require("express");
const router = express.Router();

const { User } = require("../db/models");

const { setTokenCookie, restoreUser, requireAuth } = require("../utils/auth");
const { validateSignup, validateLogin } = require("../utils/validation");
const { checkUserExists } = require("../utils/existance-check");

// LOGIN USER
router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  if (!user) {
    const err = new Error(
      "Sorry, we do not recognize this account. Please enter a valid email/password."
    );
    err.status = 401;
    return next(err);
  }

  setTokenCookie(res, user);
  res.json(user);
});

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

// RESTORE USER
router.get("/restore", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// LOG OUT
router.delete("/logout", (req, res, next) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
