const express = require("express");
const router = express.Router();

const { restoreUser, requireAuth } = require("../utils/auth");

module.exports = router;
