import { useState } from "react";
import { Modal } from "../../../../../context/Modal";
import DeleteReview from "./DeleteReview/DeleteReview";
import "./DeleteReviewModal.css";

const DeleteReviewModal = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="delete-review-modal-button"
        onClick={() => setShowModal(true)}
      >
        Delete Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReview review={review} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default DeleteReviewModal;
