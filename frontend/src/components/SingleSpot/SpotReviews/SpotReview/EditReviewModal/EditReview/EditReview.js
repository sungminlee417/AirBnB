import { useState } from "react";
import ReactStars from "react-stars";
import "./EditReview.css";

const EditReview = ({ review }) => {
  const [stars, setStars] = useState(review.stars);
  const [reviewText, setReviewText] = useState(review.review);
  const [images, setImages] = useState(review.Images);

  const ratingChanged = (newRating) => {
    setStars(newRating);
  };

  return (
    <section className="edit-review-section">
      <header>Edit Review</header>
      <div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          color2={"rgb(255, 21, 99)"}
        />
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <button>Submit Changes</button>
    </section>
  );
};

export default EditReview;
