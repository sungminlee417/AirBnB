const express = require("express");
const router = express.Router();

const {
  restoreUser,
  requireAuth,
  requireAuthorizationReview,
} = require("../utils/auth");

const {
  validateReview,
  validateSpot,
  validateAmountOfImages,
} = require("../utils/validation");

const {
  checkSpotExists,
  checkReviewExists,
} = require("../utils/existance-check");

const { Review } = require("../db/models");

router.post(
  "/:reviewId/images",
  [
    restoreUser,
    requireAuth,
    checkReviewExists,
    requireAuthorizationReview,
    validateAmountOfImages,
  ],
  async (req, res) => {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    const image = await review.createImage({
      url,
    });
    const imageData = await Image.findByPk(image.id, {
      attributes: ["id", "imageableId", "url"],
    });
    res.json(imageData);
  }
);

router.put(
  "/:reviewId",
  [
    restoreUser,
    requireAuth,
    checkReviewExists,
    requireAuthorizationReview,
    validateReview,
  ],
  async (req, res, next) => {
    const { review, stars } = req.body;
    const reviewData = await Review.findByPk(req.params.reviewId);
    await reviewData.update({
      review: review,
      stars: stars,
    });
    res.json(reviewData);
  }
);

router.delete(
  "/:reviewId",
  [restoreUser, requireAuth, checkReviewExists, requireAuthorizationReview],
  async (req, res, next) => {
    const reviewData = await Review.findByPk(req.params.reviewId);
    await reviewData.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
