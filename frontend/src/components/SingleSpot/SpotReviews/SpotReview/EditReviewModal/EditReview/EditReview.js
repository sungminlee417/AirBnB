import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";
import {
  editSpotReviewThunk,
  loadSpotReviewsThunk,
} from "../../../../../../store/reviews";
import "./EditReview.css";

const EditReview = ({ review, setShowOptions, onClose }) => {
  const dispatch = useDispatch();
  const [stars, setStars] = useState(review.stars);
  const [reviewText, setReviewText] = useState(review.review);
  const [images, setImages] = useState(review.Images);
  const [errors, setErrors] = useState([]);

  const ratingChanged = (newRating) => {
    setStars(newRating);
  };

  // const updateFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file)
  //     setImages((prevImages) => {
  //       return [...prevImages, file];
  //     });
  // };

  // const removeImage = (index) => {
  //   setImages((prevImage) => {
  //     const prevImageCopy = [...prevImage];
  //     prevImageCopy.splice(index, 1);
  //     return prevImageCopy;
  //   });
  // };

  const onEdit = () => {
    dispatch(
      editSpotReviewThunk(review.id, { review: reviewText, stars: stars })
    )
      .catch(async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data.errors)
          Object.values(data.errors).forEach((error) => errorArray.push(error));
        setErrors(errorArray);
      })
      .then(() => {
        dispatch(loadSpotReviewsThunk(review.spotId));
        setShowOptions(false);
        onClose();
      });
  };

  return (
    <section className="edit-review-section">
      <header>
        <strong className="edit-review-header">Edit Review</strong>
      </header>
      <div className="edit-review-stars-text-container">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          color2={"rgb(255, 21, 99)"}
        />
        <textarea
          className="edit-review-text-input"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      {/* <div className="edit-review-images-section">
        <header className="edit-review-images-header">
          Add or Remove Images
        </header>
        {images.length > 0 && (
          <div className="edit-review-images-container">
            {images.map((image, i) => {
              return (
                <div className="edit-review-image-container">
                  <img
                    className="edit-review-images-image"
                    src={image.url || URL.createObjectURL(image)}
                    alt="review image"
                    key={i}
                  />
                  <button
                    className="edit-review-image-remove"
                    onClick={() => removeImage(i)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <label htmlFor="edit-photo">
          <i className="fa-solid fa-plus spot-reviews-create-review-add-image-icon"></i>
        </label>
        <input
          id="edit-photo"
          type="file"
          onChange={updateFile}
          accept="image/pdf, image/png, image/jpg, image/jpeg, image/gif"
          className="spot-reviews-create-review-add-image"
        />
      </div> */}
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
      <button className="edit-review-submit-button" onClick={onEdit}>
        Submit Changes
      </button>
    </section>
  );
};

export default EditReview;
