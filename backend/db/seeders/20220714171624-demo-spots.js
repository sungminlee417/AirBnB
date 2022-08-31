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
        previewImage:
          "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg",
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
        previewImage:
          "https://www.bhg.com/thmb/a-NwJnw4qLipa1EWsJThQyc7Bik=/1280x1280/smart/filters:no_upscale():focal(899x639:901x641)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
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
        previewImage:
          "https://s3.amazonaws.com/timeinc-houseplans-v2-production/region/images/539/original/Adaptive_Cottage_front_resize.jpg?1657733110",
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
        previewImage:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        ownerId: 1,
        address: "123 Square Street",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 1231.2512387121,
        lng: -1093.11232538912,
        name: "Sam's House",
        description: "Soda",
        price: 349,
        previewImage:
          "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
      },
      {
        ownerId: 1,
        address: "21123 Avenue Street",
        city: "South Park",
        state: "Colorado",
        country: "United States of America",
        lat: 81237.325071239,
        lng: -12312.112346136,
        name: "Hanky's House",
        description: "Hello",
        price: 343,
        previewImage:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
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
