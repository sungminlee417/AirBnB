"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
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
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, {
      review: "This was an awesome spot!",
    });
  },
};
