"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/lib/data";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isCreator: boolean;
  isCustomer: boolean;
  switchRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock current user - in a real app this would come from authentication
const mockCurrentUser: User = {
  id: "creator1",
  name: "Alex Designer",
  email: "alex@example.com",
  role: "CREATOR",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  bio: "Graphic designer specializing in minimalist art",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);

  const isCreator = currentUser?.role === "CREATOR";
  const isCustomer = currentUser?.role === "CUSTOMER";

  const switchRole = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: currentUser.role === "CREATOR" ? "CUSTOMER" : "CREATOR",
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isCreator,
        isCustomer,
        switchRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}