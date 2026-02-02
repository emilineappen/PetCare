import { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "wouter";

type User = {
  name: string;
  loggedIn: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("petcare_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string) => {
    const newUser = { name, loggedIn: true };
    localStorage.setItem("petcare_user", JSON.stringify(newUser));
    setUser(newUser);
    // Force immediate location change to home
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("petcare_user");
    setUser(null);
    setLocation("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
