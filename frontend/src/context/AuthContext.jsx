import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await axios.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    const token = response.data.accessToken;

    localStorage.setItem("accessToken", token);

    setAccessToken(token);
    setUser(response.data.user);

    return response.data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });

    return response.data;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "/api/auth/refresh-token",
        {},
        {
          withCredentials: true,
        },
      );

      const newToken = response.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      setAccessToken(newToken);

      return newToken;
    } catch (error) {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);

      return null;
    }
  };

  const getMe = async (token = accessToken) => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      return null;
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await axios.post(
          "/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
      }
    } finally {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const currentUser = await getMe(token);

      if (!currentUser) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          await getMe(newToken);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        refreshAccessToken,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
