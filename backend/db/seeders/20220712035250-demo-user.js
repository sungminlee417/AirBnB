"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Stan",
          lastName: "Marsh",
          email: "stan.marsh@gmail.com",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Kyle",
          lastName: "Broflovski",
          email: "kyle.broflovski@gmail.com",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Eric",
          lastName: "Cartman",
          email: "eric.cartman@gmail.com",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Kenny",
          lastName: "McCormick",
          email: "kenny.mccormick@gmail.com",
          hashedPassword: bcrypt.hashSync("password4"),
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
