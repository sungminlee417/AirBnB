import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal({ type }) {
  const [showModal, setShowModal] = useState(false);

  let button;

  if (type === "navigation" || type === "createBooking") {
    button = (
      <button
        className={
          type === "navigation"
            ? "profile-button-link"
            : "create-booking-login-button"
        }
        onClick={() => setShowModal(true)}
      >
        Log In
      </button>
    );
  }

  if (type === "host-link") {
    button = (
      <button id="not-logged-in-host-link" onClick={() => setShowModal(true)}>
        Switch to hosting
      </button>
    );
  }

  return (
    <>
      {button}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type={"login"}>
          <LoginForm type={type} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
