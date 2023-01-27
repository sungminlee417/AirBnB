import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import {
  createSpotReviewThunk,
  loadSpotReviewsThunk,
} from "../../../store/reviews";
import { loadOneSpotThunk } from "../../../store/singleSpot";
import SpotReview from "./SpotReview/SpotReview";
import "./SpotReviews.css";

const SpotReviews = ({ spot }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const reviews = Object.values(useSelector((state) => state.reviews));
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (spot.id) {
      dispatch(loadSpotReviewsThunk(spot.id));
    }
  }, [spot]);

  if (!Object.values(spot).length) return null;

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file)
      setImages((prevImages) => {
        return [...prevImages, file];
      });
  };

  const removeImage = (index) => {
    setImages((prevImage) => {
      const prevImageCopy = [...prevImage];
      prevImageCopy.splice(index, 1);
      return prevImageCopy;
    });
  };

  const onSubmit = async () => {
    const reviewData = new FormData();

    reviewData.append("stars", rating);
    reviewData.append("review", reviewText);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      reviewData.append("images", image);
    }

    await dispatch(createSpotReviewThunk(spot.id, reviewData))
      .catch(async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data.errors)
          Object.values(data.errors).forEach((error) => errorArray.push(error));
        setErrors(errorArray);
      })
      .then(() => dispatch(loadOneSpotThunk(spot.id)));
  };

  return (
    <section className="spot-reviews-section">
      {reviews.length > 0 && (
        <>
          <header className="spot-reviews-header">Reviews</header>
          <ul className="spot-reviews-container">
            {reviews.map((review, i) => {
              return (
                <div key={i}>
                  <SpotReview review={review} />
                </div>
              );
            })}
          </ul>
        </>
      )}
      <div className="spot-reviews-create-review-container">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          color2={"rgb(255, 21, 99)"}
        />
        <div className="spot-reviews-create-review-info-container">
          <textarea
            className="spot-reviews-create-review-text-area"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <label htmlFor="add-photo">
            <i className="fa-solid fa-plus spot-reviews-create-review-add-image-icon"></i>
          </label>
          <input
            id="add-photo"
            type="file"
            onChange={updateFile}
            accept="image/pdf, image/png, image/jpg, image/jpeg, image/gif"
            className="spot-reviews-create-review-add-image"
          />
          <div className="spot-reviews-create-review-image-list">
            {images.map((image, i) => {
              return (
                <div className="spot-review-create-review-image-container">
                  <img
                    className="spot-reviews-create-review-image"
                    src={URL.createObjectURL(image)}
                    alt="review pic"
                  />
                  <button
                    className="spot-reviews-create-review-image-remove"
                    onClick={() => removeImage(i)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <ul className="errors">
          {Object.values(errors).map((error, i) => {
            return (
              <div key={i} className="error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <li>{error}</li>
              </div>
            );
          })}
        </ul>
        <button onClick={onSubmit} className="spot-reviews-create-review">
          Leave Your Review
        </button>
      </div>
    </section>
  );
};

export default SpotReviews;
