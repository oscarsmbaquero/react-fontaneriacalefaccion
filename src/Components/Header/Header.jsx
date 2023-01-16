import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout, useDispatchAuth, useGetAuth } from "../../context";
import "./Header.scss";
import logo from "../../assets/images/logo.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "@mui/material/Avatar";

function Header() {
  const userLogged = useGetAuth();
  const dispatch = useDispatchAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    ("entro");
    logout(dispatch);
    navigate("/users/login");
  };
  return (
    <div class="shadow-lg mb-1 bg-light rounded">
      <Navbar collapseOnSelect expand="md" bg="light" variant="light" >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className="logo" alt={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {userLogged.id ? (
                <>
                  <Nav.Link
                    as={Link}
                    eventKey="0"
                    to={"/avisos"}
                    className="custom-link"
                  >
                    Avisos
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    to={"/material"}
                    className="custom-link"
                  >
                    Material
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    eventKey="5"
                    to={"/clientes"}
                    className="custom-link"
                  >
                    Clientes
                  </Nav.Link>
                </>
              ) : (
                ""
              )}
            </Nav>

            <Nav>
              {userLogged.id ? (
                <>
                  <Nav.Link eventKey={2} href="#memes">
                    <Avatar
                      alt="Remy Sharp"
                      src={userLogged.image}
                      className="avatar"
                    />
                  </Nav.Link>
                  <Nav.Link href="#deets" className="user">
                    {userLogged.name}
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    eventKey="6"
                    to={"/"}
                    onClick={handleLogout}
                    className="custom-link"
                  >
                    <i class="fa-solid fa-toggle-off"></i>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    eventKey="7"
                    to={"/user/login"}
                    className="custom-link"
                  >
                    <i class="fa-solid fa-toggle-on"></i>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
