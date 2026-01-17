"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Plus,
  List,
  BarChart3,
  Store,
  CreditCard,
  Settings,
  Shirt
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Create",
    href: "/creator/create",
    icon: Plus,
  },
  {
    label: "Listings",
    href: "/creator/listings",
    icon: List,
  },
  {
    label: "Analytics",
    href: "/creator/analytics",
    icon: BarChart3,
  },
  {
    label: "Stores",
    href: "/creator/stores",
    icon: Store,
  },
  {
    label: "Payouts",
    href: "/creator/payouts",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/creator/settings",
    icon: Settings,
  },
];

interface CreatorLayoutProps {
  children: React.ReactNode;
}

export function CreatorLayout({ children }: CreatorLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shirt className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">Yeatee</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500 text-center">
              © 2024 Yeatee POD
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}