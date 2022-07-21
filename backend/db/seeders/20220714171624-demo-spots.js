"use strict";

const { query } = require("express");

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
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "260 Avenue Street",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 87.3925079,
        lng: -123.1346136,
        name: "Stan's House",
        description: "Home of the famous singer, Lorde",
        price: 343,
        previewImage: "url",
      },
      {
        ownerId: 2,
        address: "1002 Boulevard Avenue",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 12.8235911,
        lng: -51.1698319,
        name: "Kyle's House",
        description: "Infamous house of a troll.",
        price: 412,
        previewImage: "url",
      },
      {
        ownerId: 3,
        address: "8192 Avenue Court",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 58.1257124,
        lng: 59.6812698,
        name: "Eric's House",
        description: "A hotdog.",
        price: 542,
        previewImage: "url",
      },
      {
        ownerId: 4,
        address: "635 Circle Street",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 68.2587121,
        lng: -109.2538912,
        name: "Kenny's House",
        description: "SoDoSoPa",
        price: 671,
        previewImage: "url",
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
    await queryInterface.bulkDelete("Spots", {
      address: "123 Disney Lane",
    });
  },
};
