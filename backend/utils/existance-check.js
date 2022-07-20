const { User, Spot, Review, Booking, Image } = require("../db/models");

// CHECK IF USER ALREADY EXISTS MIDDLEWARE
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    const err = new Error("User already exists");
    err.status = 403;
    err.errors = { email: "User with that email already exists" };
    return next(err);
  }
  return next();
};

// CHECK SPOT EXISTS MIDDLEWARE
const checkSpotExists = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    return next();
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
};

// CHECK IF USER HAS A REVIEW FOR A CERTAIN SPOT MIDDLEWARE
const checkReviewAtSpotExists = async (req, res, next) => {
  const review = await Review.findOne({
    where: { userId: req.user.id, spotId: req.params.spotId },
  });
  if (review) {
    const err = new Error("User already has a review for this spot");
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

// CHECK IF REVIEW EXISTS MIDDLEWARE
const checkReviewExists = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (review) {
    return next();
  } else {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
};

// CHECK IF BOOKING EXISTS MIDDLEWARE
const checkBookingExists = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (booking) {
    return next();
  } else {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
};

// CREATE A BOOKING: CHECK IF BOOKING ALREADY EXISTS AND IF DATES CONFLICT MIDDLEWARE
const checkConflictingBookingExists = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const user = req.user;
  const booking = await Booking.findOne({
    where: [{ userId: user.id }, { spotId: req.params.spotId }],
  });
  if (booking) {
    if (booking.startDate === startDate || booking.endDate === endDate) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = {};
      if (booking.startDate === startDate) {
        err.errors[startDate] = "Start date conflicts with an existing booking";
      }
      if (booking.endDate === endDate) {
        err.errors[endDate] = "End date conflicts with an existing booking";
      }
      return next(err);
    }
  }
  return next();
};

const checkImageExists = async (req, res, next) => {
  const image = Image.findByPk(req.params.imageId);
  if (image) {
    return next();
  } else {
    const err = new Error("Image couldn't be found");
    err.status = 404;
    return next(err);
  }
};

module.exports = {
  checkUserExists,
  checkSpotExists,
  checkReviewAtSpotExists,
  checkReviewExists,
  checkBookingExists,
  checkConflictingBookingExists,
  checkImageExists,
};
