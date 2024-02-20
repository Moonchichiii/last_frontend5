import React, { Suspense } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useModal } from "../contexts/ModalContext";

// Lazy load the forms
const LoginForm = React.lazy(() => import("../pages/auth/LoginForm"));
const SignupForm = React.lazy(() => import("../pages/auth/SignUpForm"));

function GenericModal() {
  const { showModal, modalContent, handleCloseModal } = useModal();

  // modalcontent to render...
  const renderForm = () => {
    switch (modalContent) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      default:
        return <div>No content selected....</div>; 
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
      <Modal.Body>
        <Suspense fallback={<div>Loading...</div>}>
          {renderForm()}
        </Suspense>
              </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;