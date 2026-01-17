"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/lib/data";
import { useSession } from "next-auth/react";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isCreator: boolean;
  isCustomer: boolean;
  switchRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  React.useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        // @ts-ignore
        id: session.user.id || "unknown",
        name: session.user.name || "User",
        email: session.user.email || "",
        role: "CUSTOMER", // Default role
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Map other fields or fetch from DB if needed
      });
    } else {
      setCurrentUser(null);
    }
  }, [session]);

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