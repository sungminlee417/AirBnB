"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "demo",
          lastName: "dude",
          email: "Demo@demo.com",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        firstName: { [Op.in]: ["demo"] },
      },
      {}
    );
  },
};
