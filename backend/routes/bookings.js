const express = require("express");
const router = express.Router();

const { Booking } = require("../db/models");

const {
  restoreUser,
  requireAuth,
  requireAuthorizationSpot,
  requireAuthorizationEditingBooking,
  requireAuthorizationDeletingBooking,
} = require("../utils/auth");

const { checkBookingExists } = require("../utils/existance-check");

const {
  validateBookingEndDate,
  validateBookingDateConflict,
  validateBookingStartDate,
} = require("../utils/validation");

router.put(
  "/:bookingId",
  [
    restoreUser,
    requireAuth,
    checkBookingExists,
    requireAuthorizationEditingBooking,
    validateBookingEndDate,
    validateBookingDateConflict,
  ],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);
    booking.update({
      startDate: startDate,
      endDate: endDate,
    });
    console.log("hi");
    res.json(booking);
  }
);

router.delete(
  "/:bookingId",
  [
    restoreUser,
    requireAuth,
    checkBookingExists,
    requireAuthorizationDeletingBooking,
    validateBookingStartDate,
  ],
  async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    await booking.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
