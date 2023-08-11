import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import Modal from "react-bootstrap/Modal";
import { useCart } from "../store/ContextReducer";
import logo from "../images/logo.png";

function Header(props) {
  let data = useCart();
  const [showNav, setShowNav] = useState(false);
  const [value, setValue] = useState("");
  const [cartView, setCartView] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onValueChange(newValue);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setShowNav(true) : setShowNav(false);
    });
  });

  return (
    <Navbar className={`navbar ${showNav && "navBar_scroll"}`} variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="38"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span className="logoName">Eat'N'go</span>
        </Navbar.Brand>
        {localStorage.getItem("authToken") ? (
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navItems" to={"/"}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navItems" to={"/myOrder"}>
                My Orders
              </Link>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navItems" to={"/"}>
                Home
              </Link>
            </Nav.Link>
          </Nav>
        )}
        <Form className="d-flex" style={{ height: "30px" }}>
          <Form.Control
            type="search"
            placeholder="Filter"
            className="me-6"
            aria-label="Search"
            onChange={handleInputChange}
            value={value}
          />
        </Form>
        {!localStorage.getItem("authToken") ? (
          <div className="ms-5 me-0 d-flex">
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button
                className="me-2"
                style={{
                  fontSize: "12px",
                  height: "30px",
                  width: "85px",
                  display: "flex",
                  alignItems: "center",
                }}
                variant="outline-success"
                type="submit"
              >
                Login
              </Button>
            </Link>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <Button
                style={{
                  fontSize: "12px",
                  height: "30px",
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="outline-info"
                type="submit"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="ms-2 d-flex">
            <Button
              onClick={handleShow}
              className="buttonDes me-2"
              style={{
                fontSize: "12px",
                height: "30px",
                width: "100px",
                display: "flex",
                alignItems: "center",
              }}
              variant="success"
              type="submit"
            >
              Cart<div className="cartNum">{data.length}</div>
            </Button>
            <Modal
              style={{ maxWidth: "none" }}
              show={show}
              onHide={() => setShow(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>My Cart</Modal.Title>
              </Modal.Header>
              <Modal.Body>{<Cart />}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              onClick={handleLogout}
              style={{
                fontSize: "12px",
                height: "30px",
                width: "80px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
              variant="outline-danger"
              type="submit"
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
