const { Spot, Review, Booking } = require("../db/models");

// CHECK IF SPOT EXISTS MIDDLEWARE
const checkSpotExists = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot) {
    next();
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
};

// CHECK IF USER HAS A REVIEW FOR A CERTAIN SPOT MIDDLEWARE
const checkReviewAtCertainSpotExists = async (req, res, next) => {
  const review = await Review.findOne({
    where: { userId: req.user.id, spotId: req.params.spotId },
  });
  if (review) {
    const err = new Error("User already has a review for this spot");
    err.status = 403;
    next(err);
  } else {
    next();
  }
};

// CHECK IF REVIEW EXISTS MIDDLEWARE
const checkReviewExists = async (req, res, next) => {
  const review = await Spot.findByPk(req.params.reviewId);
  if (review) {
    next();
  } else {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    next(err);
  }
};

// CHECK IF BOOKING EXISTS MIDDLEWARE
const checkBookingExists = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (booking) {
    next();
  } else {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    next(err);
  }
};

// CREATE A BOOKING: CHECK IF BOOKING ALREADY EXISTS AND IF DATES CONFLICT MIDDLEWARE
const checkCreatingBookingExists = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const user = req.user;
  const booking = await Booking.findOne({
    where: [{ userId: user.id }, { spotId: req.params.spotId }],
  });

  if (booking.startDate === startDate || booking.endDate === endDate) {
    const err = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.status = 403;
    if (booking.startDate === startDate) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (booking.endDate === endDate) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
    next(err);
  }
  next();
};

module.exports = {
  checkSpotExists,
  checkReviewAtCertainSpotExists,
  checkReviewExists,
  checkBookingExists,
  checkCreatingBookingExists,
};
