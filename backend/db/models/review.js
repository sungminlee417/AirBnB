"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.hasMany(models.Image, {
        foreignKey: "imageableId",
        onDelete: "CASCADE",
        hooks: true,
        constraints: false,
        scope: {
          imageableType: "Review",
        },
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          len: [0, 5],
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
