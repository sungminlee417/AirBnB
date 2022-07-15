"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail.com",
          hashedPassword: bcrypt.hashSync("secret password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", {
      email: "john.smith@gmail.com",
    });
  },
};
