import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../App";
import "./index.css";

function Login() {
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
  const [details, setDetails] = useState(initialLoginDetails);
  const [validationError, setValidationError] = useState({});
  const [data, setData] = useState(initialState);
  const [isToBeRemembered, setIsToBeRemembered] = useState(false);

  function checkValidity() {
    const validEmailRegEx = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const errors = {};
    if (details.email === "") {
      errors.email = "Please enter email address";
    } else if (!validEmailRegEx.test(details.email)) {
      errors.email = "Please enter valid email address";
    }
    if (details.password === "") {
      errors.password = "Please enter password";
    } else if (details.password.length <= 8 && details.password.length > 0) {
      errors.password = "Please enter password longer than 8 characters";
    }

    setValidationError(errors);

    if (Object.keys(errors).length > 0) {
      return false;
    } else return true;
  }

  function handleRememberMe() {
    setIsToBeRemembered(!isToBeRemembered);
    console.log(isToBeRemembered);
  }

  function handleInputChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
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
    fetch("https://60dff0ba6b689e001788c858.mockapi.io/tokens", {
      method: "GET",
    })
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
    if (checkValidity()) {
      setData({
        ...data,
        isValidated: true,
      });
      handleLogin();
    }
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
    <div className="Login">
      {state.isAuthenticated === false ? (
        data.isSubmitting === false ? (
          <div className="loginForm">
            <Form noValidate validated={data.validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginFormEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  isInvalid={!!validationError.email}
                />
                <Form.Control.Feedback type="invalid">
                  {validationError.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginFormPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  isInvalid={!!validationError.password}
                />
                <Form.Control.Feedback type="invalid">
                  {validationError.password}
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
          </div>
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

export default Login;
