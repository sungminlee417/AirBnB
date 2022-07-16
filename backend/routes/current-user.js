const express = require("express");
const router = express.Router();

const { restoreUser, requireAuth } = require("../utils/auth");

const { User, Spot, Review, Image } = require("../db/models");

// GET CURRENT USER

router.get("/", [restoreUser, requireAuth], (req, res) => {
  res.json(req.user);
});

// GET CURRENT USER'S SPOTS

router.get("/spots", [restoreUser, requireAuth], async (req, res) => {
  const user = req.user;
  const spots = await Spot.findAll({
    where: { ownerId: user.id },
  });
  res.json(spots);
});

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

  res.json(reviews);
});

module.exports = router;
