import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PostPage from "./pages/PostsPage/PostPage";
import loginReducer from "./services/reducers/loginReducer";
import useLogin from "./services/customHooks/useLogin";

export const AuthContext = React.createContext();
const initialState = { isAuthenticated: false, userId: null, token: null };

function App() {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch({
        type: "LOGIN_SESSION",
        payload: {
          userId: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="posts">
              <Route index element={<PostsPage />} />
              <Route path=":id" element={<PostPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
