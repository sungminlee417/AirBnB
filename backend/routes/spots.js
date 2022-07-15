const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const { Spot, User, Review, Image } = require("../db/models");

// GET ALL SPOTS

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
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

  if (spot.id) {
    res.json(spot);
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
});

// CREATE A SPOT (WITH AUTHENTICATION)

module.exports = router;
