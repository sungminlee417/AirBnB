import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="nav-bar-button" onClick={() => setShowModal(true)}>
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
