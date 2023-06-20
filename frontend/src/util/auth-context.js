import React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
});
const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const hasToken = !!token;
  const contextValue = {
    isAuthenticated: hasToken,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
