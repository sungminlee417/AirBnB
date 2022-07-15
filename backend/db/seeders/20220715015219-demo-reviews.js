"use strict";

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        spotId: 1,
        userId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", {
      review: "This was an awesome spot!",
    });
  },
};
