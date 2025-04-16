import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginService } from "../service/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const localUser = localStorage.getItem("usuario");

        if (!token && !localUser) setUser(null);
        if (token && localUser) {
          const response = await LoginService.validateToken();
          localStorage.setItem("usuario", JSON.stringify(response));
          setUser(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao inicializar a autenticação:", error);
        setIsLoading(false);
        logout();
      }
    };

    initializeAuth();
  }, []);

  const login = (token, user) => {
    setIsLoading(true);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(user));
    setUser(user);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
