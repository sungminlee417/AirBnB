"use strict";

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        spotId: 2,
        userId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 1,
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 4,
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
