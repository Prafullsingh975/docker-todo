import React from "react";
import { whoAmI } from "../services/user";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    whoAmI()
      .then(({ data }) => {
        setAuth(data);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  }, []);
  const setAuth = (authData) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
