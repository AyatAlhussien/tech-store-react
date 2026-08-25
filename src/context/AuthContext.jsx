import { createContext, useContext, useState } from "react";
import { demoUsers } from "../data/users";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {
    const foundUser = demoUsers.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!foundUser) {
      return false;
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));

    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}