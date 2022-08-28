"use strict";
const bcrypt = require("bcryptjs");

const users = [
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
  {
    firstName: "Demo",
    lastName: "User",
    email: "demo@demo.com",
    hashedPassword: bcrypt.hashSync("12345"),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", users);
  },
};
