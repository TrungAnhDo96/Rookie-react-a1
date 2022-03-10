import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../App";
import Login from "../../components/Login";
import useLogin from "../../services/customHooks/useLogin";
import "./index.css";

function ProfilePage() {
  const { state } = React.useContext(AuthContext);

  const defaultUser = { id: 0, name: "" };
  const [user, setUser] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useLogin();

  function getUser(token, cancelSignal) {
    setIsLoading(true);
    fetch("https://60dff0ba6b689e001788c858.mockapi.io/users/" + state.userId, {
      method: "GET",
      signal: cancelSignal,
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log("Error loading user", e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    let isSubscribed = true;
    const cancelController = new AbortController();
    if (state.isAuthenticated === true) {
      getUser(state.token, cancelController.signal);
    }
    return () => {
      isSubscribed = false;
      cancelController.abort();
    };
  }, []);

  return (
    <div className="ProfilePage">
      {state.isAuthenticated === false ? (
        <div className="notLoggedIn">
          <p className="small-bold-text">You need to login to continue</p>
          <Login />
        </div>
      ) : isLoading === false ? (
        error === null ? (
          <div className="loggedIn">
            <h2>Profile</h2>
            <p>Name: {user.name}</p>
            <p>UserId: {user.id}</p>
          </div>
        ) : (
          <p>Error loading profile: {error}</p>
        )
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default ProfilePage;
