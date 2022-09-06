import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children, type }) {
  const [style, setStyle] = useState();

  useEffect(() => {
    if (type === "login") {
      setStyle("modal-content-login");
    } else if (type === "signup") {
      setStyle("modal-content-signup");
    } else if (type === "edit-booking") {
      setStyle("modal-content-edit-booking");
    } else if (type === "delete-booking") {
      setStyle("modal-content-delete-booking");
    } else if (type === "delete-spot") {
      setStyle("modal-content-delete-spot");
    } else if (type === "edit-spot") {
      setStyle("modal-content-edit-spot");
    }
  }, [type]);

  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id={style}>{children}</div>
    </div>,
    modalNode
  );
}
