"use strict";
const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: "Grozdan",
    lastName: "Ott",
    email: "grozdan.ott@gmail.com",
    hashedPassword: bcrypt.hashSync("password1"),
  },
  {
    firstName: "Lefteris",
    lastName: "Moana",
    email: "lefteris.moana@gmail.com",
    hashedPassword: bcrypt.hashSync("password2"),
  },
  {
    firstName: "Porsteinn",
    lastName: "Jolanda",
    email: "porsteinn.jolanda@gmail.com",
    hashedPassword: bcrypt.hashSync("password3"),
  },
  {
    firstName: "Drita",
    lastName: "Boniface",
    email: "drita.boniface@gmail.com",
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
