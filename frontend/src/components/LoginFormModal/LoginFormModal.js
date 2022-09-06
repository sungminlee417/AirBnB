import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal({ type }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type={"login"}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
