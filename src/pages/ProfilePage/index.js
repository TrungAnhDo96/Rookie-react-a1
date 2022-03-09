import React from "react";
import LoginForm from "../../components/LoginForm";
import "./index.css";

function ProfilePage() {
  return (
    <div className="ProfilePage">
      <p className="small-bold-text">You need to login to continue</p>
      <LoginForm />
    </div>
  );
}

export default ProfilePage;
