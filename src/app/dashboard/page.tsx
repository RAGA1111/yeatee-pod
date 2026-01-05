"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  const { currentUser, isCreator, isCustomer } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      return;
    }

    if (isCreator) {
      router.push("/dashboard/creator");
    } else if (isCustomer) {
      router.push("/dashboard/customer");
    }
  }, [currentUser, isCreator, isCustomer, router]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    </div>
  );
}
