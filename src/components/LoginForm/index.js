import React from "react";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../App";
import "./index.css";

function LoginForm() {
  const initialState = {
    email: "",
    password: "",
    isValidated: false,
    isSubmitting: false,
    isSubmitted: false,
    errorMessage: null,
  };
  const { dispatch } = React.useContext(AuthContext);
  const [data, setData] = useState(initialState);
  const [isToBeRemembered, setIsToBeRemembered] = useState(false);

  function checkValidity(form) {
    console.log(form);
    return true;
  }

  function handleRememberMe(event) {
    setIsToBeRemembered(!isToBeRemembered);
    console.log(isToBeRemembered);
  }

  function handleInputChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function handleLogout(event) {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    setData(...initialState);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData({
      ...data,
      isValidated: checkValidity(event.currentTarget),
      isSubmitting: true,
    });
    fetch("https://60dff0ba6b689e001788c858.mockapi.io/tokens")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((result) => {
        dispatch({
          type: "LOGIN_SESSION",
          payload: result,
        });
        setData({ ...data, isSubmitted: true });
      })
      .catch((e) => {
        setData({ ...data, isSubmitting: false, errorMessage: e });
      });
  }

  return (
    <div className="loginForm">
      {data.isSubmitted === false ? (
        data.isSubmitting === false ? (
          <Form noValidate validated={data.validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginFormEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginRemember">
              <Form.Check
                type="checkbox"
                label="Remember me"
                onChange={handleRememberMe}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
      ) : data.errorMessage !== null ? (
        <p>Error logging in: {data.errorMessage}</p>
      ) : (
        <div className="loggedIn">
          <p>You have logged in as {data.email}</p>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
