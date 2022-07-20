const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const { restoreUser, requireAuth } = require("../utils/auth");

const { User, Spot, Review, Booking, Image } = require("../db/models");

// GET CURRENT USER

router.get("/", [restoreUser, requireAuth], (req, res) => {
  res.json(req.user);
});

// GET CURRENT USER'S SPOTS

router.get("/spots", [restoreUser, requireAuth], async (req, res) => {
  const user = req.user;
  const spots = await Spot.findAll({
    include: { model: Image, attributes: [] },
    where: { ownerId: user.id },
    attributes: ["*", [sequelize.literal("Images.url"), "previewImage"]],
    group: ["Spot.id"],
    raw: true,
  });
  res.json({ Spots: spots });
});

// GET CURRENT USER'S REVIEWS

router.get("/reviews", [restoreUser, requireAuth], async (req, res) => {
  const user = req.user;
  const reviews = await Review.findAll({
    where: { userId: user.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
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
          "price",
        ],
      },
      {
        model: Image,
        attributes: ["id", "imageableId", "url"],
      },
    ],
  });

  res.json({ Reviews: reviews });
});

router.get("/bookings", [restoreUser, requireAuth], async (req, res) => {
  const user = req.user;
  const bookings = await Booking.findAll({
    where: { userId: user.id },
    include: {
      model: Spot,
      include: {
        model: Image,
        attributes: [],
      },
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
        "price",
        [sequelize.literal("(SELECT url FROM Images)"), "previewImage"],
      ],
      group: ["Spot.id"],
    },
  });
  res.json({ Bookings: bookings });
});

module.exports = router;
