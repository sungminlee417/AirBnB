import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as singleSpotActions from "../../store/singleSpot";
import CreateBookingCard from "./CreateBookingCard";
import "./SingleSpot.css";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot);
  const imageUrls = {};
  const review =
    spot.numReviews > 1 || spot.numReviews === 0 ? "reviews" : "review";
  let ownerFirstName = "";

  if (spot.Owner) {
    ownerFirstName = spot.Owner.firstName;
  }
  if (Array.isArray(spot.Images)) {
    spot.Images.forEach((image) => {
      imageUrls[image.id] = image;
    });
  }

  useEffect(() => {
    dispatch(singleSpotActions.loadOneSpotThunk(spotId));
    return () => dispatch(singleSpotActions.clearSpot());
  }, [dispatch, spotId]);

  return (
    <div id="single-spot-container" className="body-margin">
      <div id="single-spot-details-container">
        <h1 id="single-spot-name">{spot.name}</h1>
        <div id="single-spot-details">
          <div id="avg-star-rating-container">
            <i className="fa-solid fa-star"></i>
            <div id="avg-star-rating">{spot.avgStarRating || 0}</div>
          </div>
          <div className="single-spot-details-break-line"></div>
          <div id="num-reviews">{`${spot.numReviews || "No"} ${review}`}</div>
          <div className="single-spot-details-break-line"></div>
          <div id="single-spot-location">
            {spot.city}, {spot.state}, {spot.country}
          </div>
        </div>
        <div id="single-spot-images-container">
          <img
            id="single-spot-main-image"
            src={spot.previewImage}
            alt={spot.name}
          />
          <div id="single-spot-side-image-container">
            {Object.values(imageUrls).map((image, i) => {
              return (
                <img
                  className="single-spot-side-image"
                  key={i}
                  src={image.url}
                  alt={spot.name}
                />
              );
            })}
          </div>
        </div>
        <div id="single-spot-body-container">
          <div id="single-spot-body-text-container">
            <div id="single-spot-body-first-name">
              Entire home hosted by {ownerFirstName}
            </div>
            <div className="single-spot-body-break-line"></div>
            <div id="single-spot-body-description">{spot.description}</div>
          </div>
          <CreateBookingCard spot={spot} />
        </div>
      </div>
    </div>
  );
};

export default SingleSpot;
