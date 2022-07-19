"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Images", [
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "example1.com",
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "example2.com",
      },
      {
        imageableId: 1,
        imageableType: "Review",
        url: "example3.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", {
      url: "example.com",
    });
  },
};
