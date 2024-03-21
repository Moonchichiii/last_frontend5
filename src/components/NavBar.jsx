import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faPlusSquare,
  faUserCircle,
  faUserPlus,
  faSignOutAlt,
  faList,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useAuth } from "../hooks/UseAuth";

import { useModal } from "../contexts/ModalContext";

import useFetchPosts from "../hooks/FetchPosts";

function Navigation() {
  // fetching the user status for altering the state of the navbar
  const currentUser = useContext(CurrentUserContext);
  const { logout } = useAuth();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const { fetchPosts } = useFetchPosts();

  // update posts feed
  const UpdateFeed = () => {
    fetchPosts();
    handleOffCanvasClose();
  };

  // Modal

  const { handleShowModal } = useModal();

  //   OffCanvas menu
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const handleOffCanvasClose = () => setShowOffCanvas(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3 sticky-top">
      <Container fluid>
        <Navbar.Brand href="/">Recipe Repository</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={toggleOffCanvas}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffCanvas}
          onHide={handleOffCanvasClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!currentUser ? (
                <>
                  <Nav.Link onClick={() => handleShowModal("login")}>
                    <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                    Login
                  </Nav.Link>
                  <Nav.Link onClick={() => handleShowModal("signup")}>
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                    Sign Up
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => handleShowModal("follow")}>
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Follow
                  </Nav.Link>
                  <Nav.Link onClick={UpdateFeed}>
                    <FontAwesomeIcon icon={faList} className="me-1" />
                    Feed
                  </Nav.Link>

                  <Nav.Link href="/liked">
                    <FontAwesomeIcon icon={faHeart} className="me-1" />
                    Liked Posts
                  </Nav.Link>
                  <Nav.Link onClick={() => handleShowModal("addPost")}>
                    <FontAwesomeIcon icon={faPlusSquare} className="me-1" />
                    Add Post
                  </Nav.Link>
                  <Nav.Link onClick={() => handleShowModal("profile")}>           
  <FontAwesomeIcon icon={faUserCircle} className="me-1" />
  Profile
</Nav.Link>
                  <Nav.Link onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                    Sign out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navigation;
