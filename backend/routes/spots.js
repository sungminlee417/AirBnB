const express = require("express");
const router = express.Router();

const { Spot } = require("../db/models");

// GETTING ALL SPOTS

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
});

module.exports = router;
