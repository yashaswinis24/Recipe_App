
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedIn && currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);


  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      setIsAuthenticated(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      return true;
    }

    return false;
  };

 
  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((u) => u.email === email);
    if (!userExists) {
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
