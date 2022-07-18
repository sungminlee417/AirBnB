const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const {
  restoreUser,
  requireAuth,
  requireAuthorSpot,
} = require("../utils/auth");

const {
  checkSpotExists,
  checkReviewAtCertainSpotExists,
} = require("../utils/existance-check");

const { validateReview, validateSpot } = require("../utils/validation");

const { Spot, User, Review, Image } = require("../db/models");

// GET REVIEWS VIA SPOT ID
router.get("/:spotId/reviews", checkSpotExists, async (req, res, next) => {
  const id = req.params.spotId;
  const spot = await Spot.findByPk(id);

  const reviews = await Review.findAll({
    where: { spotId: id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Image,
        attributes: ["id", "imageableId", "url"],
      },
    ],
  });
  res.json(reviews);
});

// CREATE REVIEW FOR CERTAIN SPOT
router.post(
  "/:spotId/reviews",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    checkReviewAtCertainSpotExists,
    validateReview,
  ],
  async (req, res, next) => {
    const { review, stars } = req.body;
    const user = req.user;
    const spot = await Spot.findByPk(req.params.spotId);
    const newReview = await Review.create({
      userId: user.id,
      spotId: spot.id,
      review,
      stars,
    });
    res.json(newReview);
  }
);

// GET SPOT BY ID
router.get("/:spotId", checkSpotExists, async (req, res, next) => {
  const id = Number(req.params.spotId);
  const spot = await Spot.findByPk(id, {
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: ["id", "imageableId", "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
    ],
    group: Spot.id,
  });
  res.json(spot);
});

// EDIT A SPOT
router.put(
  "/:spotId",
  [restoreUser, requireAuth, checkSpotExists, requireAuthorSpot, validateSpot],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });
    res.json(spot);
  }
);

// GET ALL SPOTS
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
});

// CREATE A SPOT (WITH AUTHENTICATION)
router.post("/", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.create({
    ownerId: userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.json(spot);
});

module.exports = router;
