import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditSpot from "./EditSpot";

function EditSpotModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="booking-edit-container-button"
        onClick={() => setShowModal(true)}
      >
        <i className="booking-button fa-solid fa-pen-to-square fa-2x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type="edit-spot">
          <EditSpot spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
