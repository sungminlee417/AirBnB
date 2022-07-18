const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const { Spot, Review } = require("../db/models");

// SET TOKEN COOKIE
const setTokenCookie = (res, user) => {
  const token = jwt.sign({ data: user.toSafeObject() }, secret, {
    expiresIn: parseInt(expiresIn),
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// RESTORE USER MIDDLEWARE
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// AUTHENTICATION MIDDLEWARE
const requireAuth = function (req, res, next) {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.status = 401;
  return next(err);
};

// SPOT AUTHORIZATION MIDDLEWARE
const requireAuthorSpot = async (req, res, next) => {
  const spot = Spot.findByPk(req.params.spotId);
  if (spot.ownerId === req.user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

// REVIEW AUTHORIZATION MIDDLEWARE
const requireAuthorReview = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (review.userId === req.user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

const requireAuthorEditingBooking = async (req, res, next) => {};

// CREATING BOOKING AUTHORIZATION MIDDLEWARE
const requireAuthorCreatingBooking = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot.ownerId !== req.user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  requireAuthorSpot,
  requireAuthorReview,
  requireAuthorCreatingBooking,
};
