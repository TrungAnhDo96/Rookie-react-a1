import React from "react";
import { AuthContext } from "../../App";
import LoginForm from "../../components/LoginForm";
import "./index.css";

function LoginPage() {
  const { state } = React.useContext(AuthContext);
  return (
    <div className="LoginPage">
      {state.isAuthenticated ? (
        <div className="loginStatus">You have logged in</div>
      ) : null}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
