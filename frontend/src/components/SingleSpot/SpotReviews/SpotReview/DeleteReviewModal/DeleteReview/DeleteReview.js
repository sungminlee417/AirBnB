import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../../../../store/reviews";
import "./DeleteReview.css";

const DeleteReview = ({ review, onClose }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteReviewThunk(review.id)).then(() => {
      onClose();
    });
  };

  return (
    <section className="delete-review-section">
      <header className="delete-review-header">
        Are you sure you would like to delete this review?
      </header>
      <button className="delete-review-button" onClick={onDelete}>
        Delete review
      </button>
    </section>
  );
};

export default DeleteReview;
