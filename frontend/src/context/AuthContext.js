import React, { useEffect, useState } from "react";
import { getUserData } from "../lib/auth";

// set backup default for isAuthenticated if none is provided in Provider
export const AuthContext = React.createContext({ isAuthenticated: false });

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // grab token value from cookie
    const token = localStorage.getItem("token");

    if (token) {
      // authenticate the token on the server and place set user object
      getUserData(token)
        .then(async (res) => {
          setUser(res.data);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setUser(null);
          return null;
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: !!user,
        setUser: setUser,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
