const express = require("express");
const router = express.Router();

const { restoreUser, requireAuth } = require("../utils/auth");

const { Spot } = require("../db/models");

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

module.exports = router;
