const { check, validationResult, query } = require("express-validator");

const { Booking, Image, Spot } = require("../db/models");

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
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("email").exists({ checkFalsy: true }).withMessage("Invalid email"),
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
  check("lat").isDecimal().withMessage("Latitude must be a decimal"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is required"),
  check("lng").isDecimal().withMessage("Longitude must be a decimal"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price").exists({ checkFalsy: true }).withMessage("Price is required"),
  check("price").isDecimal().withMessage("Price must be a decimal"),
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

// VALIDATE BOOKING MIDDLEWARE
const validateBooking = [
  check("startDate").isDate().withMessage("Please enter a valid start date"),
  check("endDate").isDate().withMessage("Please enter a valid end date"),
  handleValidationErrors,
];

// VALIDATE BOOKING END DATE MIDDLEWARE
const validateBookingEndDate = (req, res, next) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
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
const validateBookingDateConflict = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId, {
    include: { model: Spot, attributes: ["id"] },
  });

  const { startDate, endDate } = req.body;
  const startArr = startDate.split("-");
  const endArr = endDate.split("-");

  const user = req.user;

  const bookings = await Booking.findAll({
    where: [{ userId: user.id }, { spotId: booking.Spot.id }],
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

// VALIDATE BOOKING START DATE
const validateBookingStartDate = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  console.log(req.body.startDate);

  const bookingDate = booking.startDate.split("-");
  const bookingYear = Number(bookingDate[0]);
  const bookingMonth = Number(bookingDate[1]);
  const bookingDay = Number(bookingDate[2]);

  const err = new Error("Bookings that have been started can't be deleted");
  err.status = 400;

  if (year > bookingYear) {
    return next(err);
  } else if (month > bookingMonth) {
    if (year === bookingYear) {
      return next(err);
    }
  } else if (day > bookingDay) {
    if (year === bookingYear && month === bookingMonth) {
      return next(err);
    }
  }
  next();
};

// VALIDATE BOOKING START AND END DATES
const validateBookingStartAndEndDate = (req, res, next) => {
  const { startDate, endDate } = req.body;
  const startArr = startDate.split("-");
  const startYear = Number(startArr[0]);
  const startMonth = Number(startArr[1]);
  const startDay = Number(startArr[2]);

  const endArr = endDate.split("-");
  const endYear = Number(endArr[0]);
  const endMonth = Number(endArr[1]);
  const endDay = Number(endArr[2]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const err = new Error();
  err.status = 400;
  err.errors = {};
  if (startDate === endDate) {
    err.errors.conflictingDates = "Start date and end date cannot be the same";
    next(err);
  }
  err.errors.validDate = "Please submit a valid date";

  if (year > startYear) {
    return next(err);
  } else if (month > startMonth) {
    if (year === startYear) {
      return next(err);
    }
  } else if (day > startDay) {
    if (year === startYear && month === startMonth) {
      return next(err);
    }
  }

  err.errors.validDate = "Start date must be before end date.";

  if (endYear < startYear) {
    return next(err);
  } else if (endMonth < startMonth) {
    if (endYear === startYear) {
      return next(err);
    }
  } else if (endDay < startDay) {
    if (endYear === startYear && endMonth === startMonth) {
      return next(err);
    }
  }
  next();
};

const validateAmountOfImages = async (req, res, next) => {
  const images = await Image.findAll();
  console.log(images.length);
  if (images.length >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

const validateGetAllSpotsQueries = [
  query("page")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  query("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  query("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  query("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateSpot,
  validateReview,
  validateBooking,
  validateBookingEndDate,
  validateBookingDateConflict,
  validateBookingStartDate,
  validateBookingStartAndEndDate,
  validateAmountOfImages,
  validateGetAllSpotsQueries,
};
