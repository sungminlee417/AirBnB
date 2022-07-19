const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const {
  restoreUser,
  requireAuth,
  requireAuthorizationSpot,
  requireAuthorCreatingBooking,
} = require("../utils/auth");

const {
  checkSpotExists,
  checkReviewAtSpotExists,
  checkCreatingBookingExists,
} = require("../utils/existance-check");

const { validateReview, validateSpot } = require("../utils/validation");

const { Spot, User, Review, Booking, Image } = require("../db/models");

// GET REVIEWS VIA SPOT ID
router.get("/:spotId/reviews", checkSpotExists, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  const reviews = await Review.findAll({
    where: { spotId: spot.id },
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
  res.json({ Reviews: reviews });
});

// CREATE REVIEW FOR CERTAIN SPOT
router.post(
  "/:spotId/reviews",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    checkReviewAtSpotExists,
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
    res.status(201).json(newReview);
  }
);

//GET BOOKINGS OF A CERTAIN SPOT
router.get(
  "/:spotId/bookings",
  [restoreUser, requireAuth, checkSpotExists],
  async (req, res) => {
    const user = req.user;
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot.ownerId === user.id) {
      const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        include: {
          model: User,
        },
      });
      res.json(bookings);
    } else {
      const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        attributes: ["spotId", "startDate", "endDate"],
      });
      res.json(bookings);
    }
  }
);

// CREATE BOOKING FOR CERTAIN SPOT
router.post(
  "/spots/:spotId/bookings",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    checkCreatingBookingExists,
    requireAuthorCreatingBooking,
  ],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const user = req.user;
    const booking = Booking.create({
      spotId: req.params.spotId,
      userId: user.id,
      startDate,
      endDate,
    });
    res.json(booking);
  }
);

// ADD IMAGE BASED ON SPOT
router.post(
  "/:spotId/image",
  [restoreUser, requireAuth, checkSpotExists, requireAuthorizationSpot],
  async (req, res) => {
    const { url } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const image = await Spot.createImage({
      url,
    });
    res.json(image);
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
  });
  res.json(spot);
});

// EDIT A SPOT
router.put(
  "/:spotId",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    requireAuthorizationSpot,
    validateSpot,
  ],
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

// DELETE SPOT
router.delete(
  "/:spotId",
  [restoreUser, requireAuth, checkSpotExists, requireAuthorizationSpot],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    await spot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

// GET ALL SPOTS
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: {
      model: Image,
      attributes: [],
    },
    attributes: ["*", [sequelize.literal("Images.url"), "previewImage"]],
    group: ["Spot.id"],
    raw: true,
  });
  res.json({ Spots: spots });
});

// CREATE A SPOT
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
  res.status(201).json(spot);
});

module.exports = router;
