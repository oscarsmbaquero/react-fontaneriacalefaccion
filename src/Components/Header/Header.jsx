import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { logout, useDispatchAuth, useGetAuth } from "../../context";
import "./Header.scss";
import logo from "../../assets/images/logo.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "@mui/material/Avatar";

function Header() {
  // const userLogged = useGetAuth();
  // const dispatch = useDispatchAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   ("entro");
  //   logout(dispatch);
  //   navigate("/users/login");
  // };

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="logo" alt={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              eventKey="0"
              to={"/avisos"}
              className="custom-link"
            >
             <p>Avisos</p>
            </Nav.Link>
            {/* <Nav.Link
                  as={Link}
                  eventKey="0"
                  to={"/calendar"}
                  className="custom-link"
                >
                  <i class="fa-solid fa-city"></i>
                  &nbsp;Agenda
                </Nav.Link> */}
            <Nav.Link
              as={Link}
              eventKey="1"
              to={"/material"}
              className="custom-link"
            >
              
              <p>Material</p>
            </Nav.Link>
            {/* <Nav.Link as={Link} eventKey="5" to={"/datos"} className="custom-link">
                  <i class="fa-solid fa-users"></i>
                  &nbsp;Datos
                </Nav.Link> */}
           
            {/* )} */}
          </Nav>
          {/* {userLogged.id ? ( */}
          <>
            <Nav>
            <Nav.Link
              as={Link}
              eventKey="6"
              to={"/"}
              //onClick={handleLogout}
              className="custom-link"
            >
              <i class="fa-solid fa-toggle-off"></i>
              <p>LogOut</p>
            </Nav.Link>

            <Nav.Link
              as={Link}
              eventKey="7"
              to={"/user/login"}
              className="custom-link"
            >
              <i class="fa-solid fa-toggle-on"></i>
              &nbsp;<p>LogIn</p>
            </Nav.Link>
              <Nav.Link href="#deets" className="user">
                {/* {userLogged.name} */}
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <Avatar
                  alt="Remy Sharp"
                  // src={userLogged.image}
                  className="avatar"
                />
              </Nav.Link>
            </Nav>
          </>
          {/* ) : (
            "" */}
          {/* )} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
