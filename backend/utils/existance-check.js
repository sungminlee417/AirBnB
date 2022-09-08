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
  const startArr = startDate.split("-");
  const endArr = endDate.split("-");

  const user = req.user;

  const bookings = await Booking.findAll({
    where: [{ userId: user.id }, { spotId: req.params.spotId }],
  });

  const startPrim = new Date(startArr[0], startArr[1] - 1, startArr[2])[
    Symbol.toPrimitive
  ]("number");
  const endPrim = new Date(endArr[0], endArr[1] - 1, endArr[2])[
    Symbol.toPrimitive
  ]("number");

  if (bookings) {
    bookings.forEach((booking) => {
      const bookingStartArr = booking.startDate.split("-");
      const bookingEndArr = booking.endDate.split("-");

      const bookingStartPrim = new Date(
        bookingStartArr[0],
        bookingStartArr[1] - 1,
        bookingStartArr[2]
      )[Symbol.toPrimitive]("number");

      const bookingEndPrim = new Date(
        bookingEndArr[0],
        bookingEndArr[1] - 1,
        bookingEndArr[2]
      )[Symbol.toPrimitive]("number");

      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );

      err.status = 403;
      err.errors = {};
      console.log("hi");

      if (bookingStartPrim <= startPrim && bookingEndPrim >= startPrim) {
        err.errors[1] = "Start date conflicts with an existing booking";
      }
      if (bookingStartPrim <= endPrim && bookingEndPrim >= endPrim) {
        err.errors[2] = "End date conflicts with an existing booking";
      }
      if (bookingStartPrim >= startPrim && bookingEndPrim <= endPrim) {
        err.errors[3] = "Booking already exists between two dates";
      }
      if (bookingStartPrim <= startPrim && bookingEndPrim >= endPrim) {
        err.errors[4] = "Booking already exists outside two dates";
      }
      if (Object.values(err.errors).length) {
        return next(err);
      }
    });
  }
  return next();
};

const checkImageExists = async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId);
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
