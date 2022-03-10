import React from "react";
import { AuthContext } from "../../App";
import Login from "../../components/Login";
import useLogin from "../../services/customHooks/useLogin";
import "./index.css";

function LoginPage() {
  const { state } = React.useContext(AuthContext);

  useLogin();

  return (
    <div className="LoginPage">
      {state.isAuthenticated ? <p>You have logged in</p> : null}
      <Login />
    </div>
  );
}

export default LoginPage;
