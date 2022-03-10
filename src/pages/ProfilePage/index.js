import React, { useContext } from "react";
import { AuthContext } from "../../App";
import LoginForm from "../../components/LoginForm";
import "./index.css";

function ProfilePage() {
  const { state } = React.useContext(AuthContext);

  return (
    <div className="ProfilePage">
      {state.isAuthenticated === false ? (
        <p className="small-bold-text">You need to login to continue</p>
      ) : null}
      <LoginForm />
    </div>
  );
}

export default ProfilePage;
