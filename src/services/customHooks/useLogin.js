import React, { useEffect } from "react";
import { AuthContext } from "../../App";

const useLogin = () => {
  const { dispatch } = React.useContext(AuthContext);
  useEffect(() => {
    const sessionUserId = sessionStorage.getItem("userId");
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken !== null) {
      dispatch({
        type: "LOGIN_SESSION",
        payload: { userId: sessionUserId, token: sessionToken },
      });
    }
  }, []);
};

export default useLogin;
