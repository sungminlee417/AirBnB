const { Spot, Review } = require("../db/models");

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

module.exports = {
  checkSpotExists,
  checkReviewAtCertainSpotExists,
  checkReviewExists,
};
