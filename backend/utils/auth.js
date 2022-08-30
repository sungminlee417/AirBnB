const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { expiresIn, secret } = jwtConfig;

const { Booking, Review, Spot, Image } = require("../db/models");

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
const requireAuthorizationSpot = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const user = req.user;
  if (spot.ownerId === user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

// REVIEW AUTHORIZATION MIDDLEWARE
const requireAuthorizationReview = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (review.userId === req.user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

// AUTHORIZATION FOR EDITING BOOKING
const requireAuthorizationEditingBooking = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const user = req.user;
  if (booking.userId === user.id) {
    return next();
  } else {
    const err = new Error(
      "You do not have permission to edit another user's bookings."
    );
    err.status = 403;
    return next(err);
  }
};

// CREATING BOOKING AUTHORIZATION MIDDLEWARE
const requireAuthorizationCreatingBooking = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot.ownerId !== req.user.id) {
    return next();
  } else {
    const err = new Error("You cannot book your own spot.");
    err.status = 403;
    return next(err);
  }
};

// DELETING BOOKING AUTHORIZATION MIDDLEWARE
const requireAuthorizationDeletingBooking = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const spot = await Spot.findByPk(booking.spotId);
  const user = req.user;
  if (booking.userId === user.id || spot.ownerId === user.id) {
    return next();
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
};

// AUTHORIZATION FOR DELETING IMAGE
const requireAuthorizationDeletingImage = async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId);
  const user = req.user;

  let userId;

  if (image.imageableType === "Spot") {
    const spot = await Spot.findByPk(image.imageableId);
    userId = spot.ownerId;
  } else if (image.imageableType === "Review") {
    const review = await Review.findByPk(image.imageableId);
    userId = review.userId;
  }

  if (user.id === userId) {
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
  requireAuthorizationSpot,
  requireAuthorizationReview,
  requireAuthorizationCreatingBooking,
  requireAuthorizationEditingBooking,
  requireAuthorizationDeletingBooking,
  requireAuthorizationDeletingImage,
};
