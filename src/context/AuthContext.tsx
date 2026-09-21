import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, RegisterFormData, AuthState } from "../types";
import { SEED_USERS, DEMO_CREDENTIALS } from "../data/seedUsers";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toast: string | null;
  setToast: (msg: string | null) => void;
}

const STORAGE_KEY_AUTH_USER = "sevafix_auth_user";
const STORAGE_KEY_DEMO_USERS = "sevafix_demo_users";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    try {
      const savedUserJson = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      if (savedUserJson) {
        const parsedUser = JSON.parse(savedUserJson);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Failed to restore authentication session:", err);
      localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRegisteredUsers = (): User[] => {
    try {
      const customUsersJson = localStorage.getItem(STORAGE_KEY_DEMO_USERS);
      const customUsers: User[] = customUsersJson ? JSON.parse(customUsersJson) : [];
      return [...SEED_USERS, ...customUsers];
    } catch (err) {
      console.error("Failed to read user storage:", err);
      return SEED_USERS;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const normalizedEmail = email.trim().toLowerCase();
    
    const matchedDemo = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === normalizedEmail && c.password === password
    );

    let targetUser: User | null = null;

    if (matchedDemo) {
      targetUser = matchedDemo.user;
    } else {
      const allUsers = getRegisteredUsers();
      const found = allUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (found && password.length >= 6) {
        targetUser = found;
      }
    }

    if (targetUser) {
      setUser(targetUser);
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(targetUser));
      setIsLoading(false);
      setToast(`Welcome back, ${targetUser.name}! Signed in as ${targetUser.role.toUpperCase()}.`);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (data: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    const normalizedEmail = data.email.trim().toLowerCase();
    const allUsers = getRegisteredUsers();

    if (allUsers.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: normalizedEmail,
      phone: data.phone?.trim() || "+91 98765 00000",
      city: data.city?.trim() || "Meerut",
      role: "citizen",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    try {
      const customUsersJson = localStorage.getItem(STORAGE_KEY_DEMO_USERS);
      const customUsers: User[] = customUsersJson ? JSON.parse(customUsersJson) : [];
      customUsers.push(newUser);
      localStorage.setItem(STORAGE_KEY_DEMO_USERS, JSON.stringify(customUsers));

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(newUser));
      setToast(`Account created successfully! Welcome to SevaFix, ${newUser.name}.`);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Failed to register user:", err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    setUser(null);
    setToast("You have been signed out successfully.");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(updatedUser));
    setToast("Profile updated successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        toast,
        setToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
