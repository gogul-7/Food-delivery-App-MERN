import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });
    const json = await res.json();
    if (!json.success) {
      alert("Enter valid credentials");
      navigate("/login");
    } else {
      localStorage.setItem("userEmail", details.email);
      localStorage.setItem("authToken", json.authToken);
      alert("Login Successfull");
      navigate("/");
    }
  };
  console.log(details);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };
  return (
    <>
      <Header />
      <div
        className="container border p-5 w-50"
        style={{
          marginTop: "150px",
          position: "relative",
          marginBottom: "217px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={details.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-success" type="submit">
              Log In
            </Button>
          </div>
          <div className="mt-3 text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="mb-3"
              to="/login"
            >
              New User? Sign up
            </Link>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
