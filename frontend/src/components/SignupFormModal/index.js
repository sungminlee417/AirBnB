import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupFormModal.css";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button class="signup-button" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type={"signup"}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
