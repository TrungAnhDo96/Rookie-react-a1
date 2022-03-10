import React from "react";
import useLogin from "../../services/customHooks/useLogin";
import "./index.css";

function HomePage() {
  useLogin();

  return (
    <div className="HomePage">
      <p className="big-bold-NewRoman-text">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </p>
    </div>
  );
}

export default HomePage;
