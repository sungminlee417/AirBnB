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
        url: "https://media.istockphoto.com/photos/looking-directly-up-at-the-skyline-of-the-financial-district-in-picture-id1351571961?b=1&k=20&m=1351571961&s=170667a&w=0&h=FDO6SSu9iKVJQRZbSLj5L3q_vKjI7Q39ECoTgX1-Duk=",
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://cdn.pixabay.com/photo/2020/02/16/20/29/nyc-4854718__340.jpg",
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://media.istockphoto.com/photos/empty-road-at-building-exterior-picture-id479842074?k=20&m=479842074&s=612x612&w=0&h=HS6lsU1f9W21IkotS3cxdvU5KeEO-gLMUa6xrIBbR6k=",
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://media.istockphoto.com/photos/looking-directly-up-at-the-skyline-of-the-financial-district-in-picture-id1351571961?b=1&k=20&m=1351571961&s=170667a&w=0&h=FDO6SSu9iKVJQRZbSLj5L3q_vKjI7Q39ECoTgX1-Duk=",
      },
      {
        imageableId: 2,
        imageableType: "Spot",
        url: "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
      },
      {
        imageableId: 1,
        imageableType: "Review",
        url: "https://www.mydomaine.com/thmb/sEVlAsVoifoG-ZLxsnWk0q0ZVrQ=/3409x3409/filters:fill(auto,1)/binary-4--583f06853df78c6f6a9e0b7a.jpeg",
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
