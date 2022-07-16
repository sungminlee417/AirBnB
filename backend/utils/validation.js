const { validationResult } = require("express-validator");
const { check } = require("express-validator");

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

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
};
