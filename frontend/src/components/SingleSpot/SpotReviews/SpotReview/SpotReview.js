import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteReview from "./DeleteReviewModal/DeleteReview/DeleteReview";
import DeleteReviewModal from "./DeleteReviewModal/DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";
import "./SpotReview.css";

const SpotReview = ({ review }) => {
  const user = useSelector((state) => state.session.user);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!showOptions) return;

    const hideOptions = () => {
      setShowOptions(false);
    };

    document.addEventListener("click", hideOptions);

    return () => document.removeEventListener("click", hideOptions);
  }, [showOptions]);

  const showMoreOptions = () => {
    if (!showOptions) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  return (
    <li className="spot-review-container">
      <div className="spot-review-header-container">
        <div className="spot-review-user">
          {review.User.firstName} {review.User.lastName}
        </div>
        {user && user.id === review.userId && (
          <button
            className="spot-review-options-button"
            onClick={showMoreOptions}
          >
            <i className="fa-solid fa-ellipsis spot-review-options-button-icon"></i>
          </button>
        )}
        {showOptions && (
          <div
            className="spot-review-options"
            onClick={(e) => e.stopPropagation()}
          >
            <EditReviewModal review={review} />
            <DeleteReviewModal review={review} />
          </div>
        )}
      </div>
      <div className="spot-review-stars">
        <i className="fa-solid fa-star"></i>
        <div>{review.stars}</div>
      </div>
      <div>{review.review}</div>
      {review.Images.length > 0 && (
        <div className="spot-review-images-container">
          {review.Images.map((image, i) => {
            return (
              <img
                className="spot-review-images-image"
                src={image.url}
                alt="review image"
                key={i}
              />
            );
          })}
        </div>
      )}
    </li>
  );
};

export default SpotReview;
