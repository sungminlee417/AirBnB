import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeleteSpot from "./DeleteSpot";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="spot-edit-container-button"
        onClick={() => setShowModal(true)}
      >
        <i className="spot-button fa-solid fa-trash fa-2x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type="delete-spot">
          <DeleteSpot spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotModal;
