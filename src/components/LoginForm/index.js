import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../App";
import "./index.css";

function LoginForm() {
  const initialLoginDetails = {
    email: "",
    password: "",
  };
  const initialState = {
    isLoaded: false,
    isValidated: false,
    isSubmitting: false,
    errorMessage: null,
  };
  const { state, dispatch } = React.useContext(AuthContext);
  const [detail, setDetails] = useState(initialLoginDetails);
  const [data, setData] = useState(initialState);
  const [isToBeRemembered, setIsToBeRemembered] = useState(false);

  function checkValidity(form) {
    console.log(form);
    return true;
  }

  function handleRememberMe() {
    setIsToBeRemembered(!isToBeRemembered);
    console.log(isToBeRemembered);
  }

  function handleInputChange(event) {
    setDetails({ ...detail, [event.target.name]: event.target.value });
  }

  function handleLogout() {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    setData({ ...initialState });
  }

  function handleLogin() {
    setData({
      ...data,
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
        if (isToBeRemembered === true) {
          dispatch({
            type: "LOGIN_LOCAL",
            payload: result,
          });
        }
        setData({ ...data, isSubmitting: false });
      })
      .catch((e) => {
        setData({ ...data, isSubmitting: false, errorMessage: e });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData({
      ...data,
      isValidated: checkValidity(event.currentTarget),
    });
    handleLogin();
  }

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    const localToken = localStorage.getItem("token");
    if (localToken !== null && data.isLoaded === false) {
      setData({ ...data, isValidated: true });
      dispatch({
        type: "LOGIN_SESSION",
        payload: { userId: localUserId, token: localToken },
      });
    }
    setData({ ...data, isLoaded: true });
  }, []);

  return (
    <div className="loginForm">
      {state.isAuthenticated === false ? (
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
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default LoginForm;
