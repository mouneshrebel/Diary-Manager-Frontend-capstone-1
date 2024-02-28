import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import UseLogout from "../hook/UseLogout";

function NavBar() {
  const LogoutLink = UseLogout();
  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <div className="Logo">
              <i
                className="fa-brands fa-codepen fa-2xl"
                style={{ color: "#48dbd8" }}
              ></i>
            </div>
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            <h5 className="Logo-name">Diary Manager</h5>
          </Navbar.Brand>{" "}
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/home")} href="#home">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/dashboard")} href="#Dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/addproject")}
              href="#AddProject"
            >
              AddProject
            </Nav.Link>

            <Nav.Link>
              {" "}
              <LogoutLink />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
