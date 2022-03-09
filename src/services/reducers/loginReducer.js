const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SESSION":
      sessionStorage.setItem("userId", action.payload.userId);
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case "LOGIN_LOCAL":
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        token: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
