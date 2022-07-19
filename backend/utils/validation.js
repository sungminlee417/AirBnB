const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const { Booking } = require("../db/models");

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Validation error");
    err.status = 400;
    err.errors = errors;
    next(err);
  }
  next();
};

// SIGN UP USER
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// LOG IN USER
const validateLogin = [
  check("email").exists({ checkFalsy: true }).withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// VALIDATE SPOT MIDDLEWARE
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat").exists({ checkFalsy: true }).withMessage("Latitude is required"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is required"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price").exists({ checkFalsy: true }).withMessage("Price is required"),
  handleValidationErrors,
];

// VALIDATE REVIEW MIDDLEWARE
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// VALIDATE BOOKING DATE MIDDLEWARE
const validateBookingDate = (req, res, next) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const bookingDate = req.body.endDate.split("-");
  const bookingYear = Number(bookingDate[0]);
  const bookingMonth = Number(bookingDate[1]);
  const bookingDay = Number(bookingDate[2]);

  const err = new Error("Past bookings can't be modified");
  err.status = 400;

  if (year > bookingYear) {
    return next(err);
  } else if (month > bookingMonth) {
    if (year === bookingYear) {
      return next(err);
    } else if (day > bookingDay) {
      if (year === bookingYear && year === bookingMonth) {
        return next(err);
      }
    }
  }
  next();
};

// VALIDATE BOOKING DATE CONFLICT
const validateBookingConflict = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const bookings = await Booking.findByPk(req.params.bookingId);
  const originalStart = bookings.startDate;
  const originalEnd = bookings.endDate;

  if (originalStart === startDate || originalEnd === endDate) {
    const err = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.status = 403;
    if (originalStart === startDate) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (originalEnd === endDate) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
    return next(err);
  }
};

const validateBookingStartDate = async (req, res, next) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const bookingDate = req.body.startDate.split("-");
  const bookingYear = Number(bookingDate[0]);
  const bookingMonth = Number(bookingDate[1]);
  const bookingDay = Number(bookingDate[2]);

  if (year < bookingYear) {
    return next(err);
  } else if (month < bookingMonth) {
    if (year === bookingYear) {
      return next(err);
    } else if (day < bookingDay) {
      if (year === bookingYear && year === bookingMonth) {
        return next(err);
      }
    }
  }
  next();
};

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateSpot,
  validateReview,
  validateBookingDate,
  validateBookingConflict,
  validateBookingStartDate,
};
