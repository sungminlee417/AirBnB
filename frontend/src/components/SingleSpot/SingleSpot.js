import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import * as singleSpotActions from "../../store/singleSpot";
import CreateBookingCard from "./CreateBookingCard";
import "./SingleSpot.css";
import SingleSpotImages from "./SingleSpotImages";
import SpotReviews from "./SpotReviews";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot);
  const [showModal, setShowModal] = useState(false);
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

  const showImages = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(singleSpotActions.loadOneSpotThunk(spotId));
    return () => dispatch(singleSpotActions.clearSpot());
  }, [dispatch, spotId]);

  return (
    <div className="single-spot-container">
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
          <button
            className="single-spot-images-modal-button"
            onClick={showImages}
          >
            <img
              id="single-spot-main-image"
              src={spot.previewImage}
              alt={spot.name}
            />
          </button>
          {Object.values(imageUrls).length === 1 && (
            <button
              className="single-spot-images-modal-button"
              onClick={showImages}
            >
              <img
                className="single-spot-side-image"
                src={Object.values(imageUrls)[0].url}
                alt={spot.name}
              />
            </button>
          )}
          {Object.values(imageUrls).length === 2 && (
            <div id="single-spot-side-image-container-two">
              {Object.values(imageUrls).map((image, i) => {
                return (
                  <button
                    className="single-spot-images-modal-button"
                    onClick={showImages}
                  >
                    <img
                      className="single-spot-side-image"
                      key={i}
                      src={image.url}
                      alt={spot.name}
                    />
                  </button>
                );
              })}
            </div>
          )}
          {Object.values(imageUrls).length === 3 && (
            <div id="single-spot-side-image-container-three">
              {Object.values(imageUrls).map((image, i) => {
                return (
                  <button
                    className={`single-spot-images-modal-button single-spot-images-modal-button-${i}`}
                    onClick={showImages}
                  >
                    <img
                      className={`single-spot-side-image single-spot-side-image-${i}`}
                      key={i}
                      src={image.url}
                      alt={spot.name}
                    />
                  </button>
                );
              })}
            </div>
          )}
          {Object.values(imageUrls).length > 3 && (
            <div class="single-spot-side-image-container-more">
              {Object.values(imageUrls).map((image, i) => {
                if (i < 4) {
                  return (
                    <button
                      className={`single-spot-images-modal-button`}
                      onClick={showImages}
                    >
                      <img
                        className={`single-spot-side-image`}
                        key={i}
                        src={image.url}
                        alt={spot.name}
                      />
                    </button>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div id="single-spot-body-container">
          <div id="single-spot-body-text-container">
            <div id="single-spot-body-first-name">
              Entire home hosted by {ownerFirstName}
            </div>
            <div className="single-spot-body-break-line"></div>
            <div id="single-spot-body-description">{spot.description}</div>
            <div className="single-spot-body-break-line"></div>
            <div id="single-spot-reviews-container">
              <SpotReviews spot={spot} />
            </div>
          </div>
          <CreateBookingCard spot={spot} />
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <SingleSpotImages
            previewImage={spot.previewImage}
            images={imageUrls}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default SingleSpot;
