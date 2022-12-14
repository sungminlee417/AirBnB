"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, users);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options, users);
  },
};
