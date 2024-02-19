import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleShowModal = (content) => {
    setModalContent(content); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(""); 
  };

  return (
    <ModalContext.Provider value={{ showModal, modalContent, handleShowModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};