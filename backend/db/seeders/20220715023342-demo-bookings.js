"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-11-19",
        endDate: "2022-11-19",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2022-11-19",
        endDate: "2021-11-19",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2022-11-19",
        endDate: "2021-11-19",
      },
      {
        spotId: 4,
        userId: 2,
        startDate: "2022-11-19",
        endDate: "2021-11-19",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    for (let i = 1; i <= 4; i++) {
      await queryInterface.bulkDelete("Bookings", {
        spotId: i,
      });
    }
  },
};
