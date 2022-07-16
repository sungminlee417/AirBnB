const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const { restoreUser, requireAuth, requireAuthor } = require("../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

const { Spot, User, Review, Image } = require("../db/models");

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

// CHECK IF SPOT EXISTS HELPER FUNCTION

const checkSpotExists = (spot, next) => {
  if (spot) {
    return;
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
};

// GET REVIEWS VIA SPOT ID

router.get("/:spotId/reviews", async (req, res, next) => {
  const id = Number(req.params.spotId);
  const spot = await Spot.findByPk(id);

  checkSpotExists(spot, next);

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

// GET SPOT BY ID

router.get("/:spotId", async (req, res, next) => {
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
      [sequelize.fn("SUM", sequelize.col("Reviews.id")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
    ],
  });

  checkSpotExists(spot.id, next);
  res.json(spot);
});

// EDIT A SPOT

router.put(
  "/:spotId",
  [restoreUser, requireAuth, validateSpot],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    checkSpotExists(spot, next);

    if (spot.ownerId === req.user.id) {
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
    } else {
      requireAuthor(req, res, next);
    }
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