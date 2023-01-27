import { useState } from "react";
import { Modal } from "../../../../../context/Modal";
import EditReview from "./EditReview/EditReview";
import "./EditReviewModal.css";

const EditReviewModal = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="edit-review-modal-button"
        onClick={() => setShowModal(true)}
      >
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview review={review} />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
