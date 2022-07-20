const express = require("express");
const router = express.Router();

const {
  restoreUser,
  requireAuth,
  requireAuthorizationDeletingImage,
} = require("../utils/auth");

const { checkImageExists } = require("../utils/existance-check");

const { Image } = require("../db/models");

router.delete(
  "/:imageId",
  [
    restoreUser,
    requireAuth,
    checkImageExists,
    requireAuthorizationDeletingImage,
  ],
  async (req, res) => {
    const image = await Image.findByPk(req.params.imageId);
    await image.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
