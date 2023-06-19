import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { BsBagCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Navbars = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <Nav.Link>VEESHOP</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/home'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <Navbar.Brand>
                <LinkContainer to='/cart'>
                  <BsBagCheck />
                </LinkContainer>
                <small className='fs-6'>{cartTotalQuantity}</small>
              </Navbar.Brand>
              {auth._id ? (
                <>
                  {auth.isAdmin ? (
                    <LinkContainer to='/admin/summary'>
                      <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>
                  ) : null}

                  <LinkContainer to='/cart'>
                    <Nav.Link
                      onClick={() => {
                        dispatch(logoutUser(null));
                        toast.warning("Logged out", {
                          position: "bottom-left",
                        });
                      }}
                    >
                      LogOut
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link to='/cart'>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
