import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeleteBooking from "./DeleteBooking";
import "./DeleteBookingModal.css";

function DeleteBookingModal({ booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="booking-edit-container-button"
        onClick={() => setShowModal(true)}
      >
        <i className="booking-button fa-solid fa-trash fa-2x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type="delete-booking">
          <DeleteBooking booking={booking} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBookingModal;
