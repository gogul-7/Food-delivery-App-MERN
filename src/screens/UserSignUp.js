import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserSignUp() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location,
      }),
    });
    const json = await res.json();
    navigate("/login");
    if (!json.success) {
      alert("Enter valid credentials");
      navigate("/signup");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };
  console.log(details);
  return (
    <>
      <Header />
      <div
        className="container border p-5 mb-5 w-50"
        style={{ marginTop: "100px" }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName" name="usname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={details.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              value={details.location}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-success" type="submit">
              Sign Up
            </Button>
          </div>
          <div className="mt-3 text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="mb-3"
              to="/login"
            >
              Already a user
            </Link>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default UserSignUp;
