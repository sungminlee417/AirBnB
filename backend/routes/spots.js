const express = require("express");
const router = express.Router();

const { multipleMulterUpload, multiplePublicFileUpload } = require("../awsS3");

const { Op } = require("sequelize");

const {
  restoreUser,
  requireAuth,
  requireAuthorizationSpot,
  requireAuthorizationCreatingBooking,
} = require("../utils/auth");

const {
  checkSpotExists,
  checkReviewAtSpotExists,
  checkConflictingBookingExists,
} = require("../utils/existance-check");

const {
  validateReview,
  validateSpot,
  validateGetAllSpotsQueries,
  validateBooking,
  validateBookingStartAndEndDate,
} = require("../utils/validation");

const { Spot, User, Review, Booking, Image } = require("../db/models");

// GET REVIEWS VIA SPOT ID
router.get("/:spotId/reviews", checkSpotExists, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  const reviews = await Review.findAll({
    where: { spotId: spot.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      { model: Image, attributes: ["url"] },
    ],
  });

  // for (let review of reviews) {
  //   const images = await Image.findAll({ where: { imageableId: review.id } });
  //   const imagesArr = [];
  //   images.forEach((image) => {
  //     imagesArr.push(image.url);
  //   });
  //   review.dataValues["Images"] = imagesArr;
  // }

  res.json(reviews);
});

// CREATE REVIEW FOR CERTAIN SPOT
router.post(
  "/:spotId/reviews",
  multipleMulterUpload("images"),
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    checkReviewAtSpotExists,
    validateReview,
  ],
  async (req, res, next) => {
    const { review, stars } = req.body;
    const imagesURL = await multiplePublicFileUpload(req.files);
    const user = req.user;
    const newReview = await Review.create({
      userId: user.id,
      spotId: req.params.spotId,
      review,
      stars,
    });

    imagesURL.forEach(async (imageUrl) => {
      await newReview.createImage({ imageableType: "Review", url: imageUrl });
    });

    const singleReview = await Review.findByPk(newReview.id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        { model: Image, attributes: ["url"] },
      ],
    });

    res.status(201).json(singleReview);
  }
);

//GET BOOKINGS OF A CERTAIN SPOT
router.get(
  "/:spotId/bookings",
  [restoreUser, requireAuth, checkSpotExists],
  async (req, res) => {
    const user = req.user;
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot.ownerId === user.id) {
      const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      });
      res.json({ Bookings: bookings });
    } else {
      const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        attributes: ["spotId", "startDate", "endDate"],
      });
      res.json({ Bookings: bookings });
    }
  }
);

// CREATE BOOKING FOR CERTAIN SPOT
router.post(
  "/:spotId/bookings",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    validateBooking,
    validateBookingStartAndEndDate,
    checkConflictingBookingExists,
    requireAuthorizationCreatingBooking,
  ],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const user = req.user;
    const booking = await Booking.create({
      spotId: req.params.spotId,
      userId: user.id,
      startDate,
      endDate,
    });
    res.json(booking);
  }
);

// ADD IMAGE BASED ON SPOT
router.post(
  "/:spotId/images",
  [restoreUser, requireAuth, checkSpotExists, requireAuthorizationSpot],
  async (req, res) => {
    const { url } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const image = await spot.createImage({
      url,
    });
    const imageData = await Image.findByPk(image.id, {
      attributes: ["id", "imageableId", "imageableType", "url"],
    });
    res.json(imageData);
  }
);

// GET SPOT BY ID
router.get("/:spotId", checkSpotExists, async (req, res, next) => {
  const id = Number(req.params.spotId);
  const spot = await Spot.findByPk(id, {
    include: [
      {
        model: Image,
        attributes: ["id", "imageableId", "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  const numReviews = await Review.count({
    where: { spotId: spot.id },
  });
  const sum = await Review.sum("stars", {
    where: { spotId: spot.id },
  });
  const avgStarRating = parseFloat((sum / numReviews).toFixed(2));

  spot.dataValues["numReviews"] = numReviews;
  spot.dataValues["avgStarRating"] = avgStarRating;

  res.json(spot);
});

// EDIT A SPOT
router.put(
  "/:spotId",
  [
    restoreUser,
    requireAuth,
    checkSpotExists,
    requireAuthorizationSpot,
    validateSpot,
  ],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });
    res.json(spot);
  }
);

// DELETE SPOT
router.delete(
  "/:spotId",
  [restoreUser, requireAuth, checkSpotExists, requireAuthorizationSpot],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    await spot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

// GET ALL SPOTS
router.get("/", validateGetAllSpotsQueries, async (req, res) => {
  let { page, size } = req.query;
  const { maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;

  page ? (page <= 10 ? (page = Number(page)) : (page = 0)) : (page = 0);
  size ? (size <= 20 ? (size = Number(size)) : (size = 20)) : (size = 20);

  const limit = size;
  const offset = page ? size * (page - 1) : 0;

  const where = {};

  if (maxLat) where.lat = { [Op.lte]: Number(maxLat) };
  if (minLat) where.lat = { [Op.gte]: Number(minLat) };
  if (maxLng) where.lng = { [Op.lte]: Number(maxLat) };
  if (minLng) where.lng = { [Op.gte]: Number(minLng) };
  if (maxPrice) where.price = { [Op.lte]: Number(maxPrice) };
  if (minPrice) where.price = { [Op.gte]: Number(minPrice) };

  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: Image,
        attributes: [],
      },
    ],
    limit: limit,
    offset: offset,
  });
  res.json({ Spots: spots, page: page, size: size });
});

// CREATE A SPOT
router.post(
  "/",
  multipleMulterUpload("previewImages"),
  [restoreUser, requireAuth, validateSpot],
  async (req, res) => {
    const userId = req.user.id;
    const previewImagesURL = await multiplePublicFileUpload(req.files);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const spot = await Spot.create({
      ownerId: userId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage: previewImagesURL[0],
    });

    previewImagesURL.forEach(async (previewImageUrl, i) => {
      if (i) {
        await spot.createImage({ imageableType: "Spot", url: previewImageUrl });
      }
    });

    res.status(201).json(spot);
  }
);

module.exports = router;
