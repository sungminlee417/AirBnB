const express = require("express");
const router = express.Router();

const { Booking } = require("../db/models");

const {
  restoreUser,
  requireAuth,
  requireAuthorSpot,
  requireAuthorEditingBooking,
} = require("../utils/auth");

const { checkBookingExists } = require("../utils/existance-check");

const {
  validateBookingDate,
  validateBookingConflict,
} = require("../utils/validation");

router.put(
  "/:bookingId",
  [
    restoreUser,
    requireAuth,
    checkBookingExists,
    requireAuthorEditingBooking,
    validateBookingDate,
    validateBookingConflict,
  ],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = Booking.findByPk(req.params.bookingId);
    booking.update({
      startDate: startDate,
      endDate: endDate,
    });
    res.json(booking);
  }
);

router.delete(
  "/:bookingId",
  [
    restoreUser,
    requireAuth,
    requireAuthorSpot,
    checkBookingExists,
    requireAuthorEditingBooking,
  ],
  async (req, res) => {
    const booking = Booking.findByPk(req.params.bookingId);
    await booking.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
