import React, { Suspense } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useModal } from "../contexts/ModalContext";

// Lazy loading the forms
// auth forms
const LoginForm = React.lazy(() => import("../pages/auth/LoginForm"));
const SignupForm = React.lazy(() => import("../pages/auth/SignUpForm"));
//  posts forms
const PostForm = React.lazy(() => import("../pages/posts/PostForm.jsx"));
const PostEdit = React.lazy(() => import("../pages/posts/PostEdit"));

// Profile Forms
const ProfileView = React.lazy(() =>
  import("../pages/profiles/ProfileView.jsx")
);
// const ProfileEditForm = React.lazy(() => import("./profiles/ProfileEdit"));

function GenericModal() {
  const { showModal, modalContent, handleCloseModal } = useModal();

  // modalcontent to render...
  const renderForm = () => {
    switch (modalContent) {
      case "login":
        return <LoginForm />;
      case "signup":
        return <SignupForm />;
      case "addPost":
        return <PostForm />;
      case "editPost":
        return <PostEdit />;

      case "profile":
        return <ProfileView />;

      //  case 'editProfile':
      //    return <ProfileEditView />;
      default:
        return <div>No content selected....</div>;
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <Suspense fallback={<div>Loading...</div>}>{renderForm()}</Suspense>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
