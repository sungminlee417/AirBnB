const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const { restoreUser, requireAuth } = require("../utils/auth");

const { User, Spot, Review, Booking, Image } = require("../db/models");

// GET CURRENT USER'S SPOTS
router.get("/spots", [restoreUser, requireAuth], async (req, res) => {
  const user = req.user;
  const spots = await Spot.findAll({
    include: { model: Image, attributes: [] },
    where: { ownerId: user.id },
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
    ],
  });

  for (let review of reviews) {
    const images = await Image.findAll({ where: { imageableId: review.id } });
    const imagesArr = [];
    images.forEach((image) => {
      imagesArr.push(image.url);
    });
    review.dataValues["Images"] = imagesArr;
  }

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
        "previewImage",
      ],
    },
  });
  res.json({ Bookings: bookings });
});

// GET CURRENT USER
router.get("/", [restoreUser, requireAuth], (req, res) => {
  const user = req.user;
  const token = req.cookies.token;
  user.dataValues["token"] = token;
  res.json(req.user);
});

module.exports = router;
