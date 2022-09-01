import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditBooking from "./EditBooking";
// import "./EditBookingModal.css";

function EditBookingModal({ booking }) {
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
        <Modal onClose={() => setShowModal(false)} type="edit-booking">
          <EditBooking booking={booking} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditBookingModal;
