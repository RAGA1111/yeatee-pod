"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, Settings, LogOut, User as UserIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { currentUser, isCreator, switchRole } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40 font-sans">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="text-3xl font-bold tracking-tighter text-primary group-hover:opacity-90 transition-opacity">
              Yeatee<span className="text-foreground text-sm font-normal ml-1 tracking-wide uppercase">Studio</span>
            </h1>
          </Link>

          {/* Search Bar - Minimal */}
          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <input
              type="text"
              placeholder="Search designs, shops, or tags..."
              className="w-full h-11 pl-12 pr-4 rounded-full bg-secondary/5 border-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/70"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search Toggle (Mobile) */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Search className="h-5 w-5" />
            </Button>

            {/* Role Switcher - Heroic Placement */}
            {currentUser && (
              <Button
                variant={isCreator ? "default" : "outline"}
                className={`hidden sm:flex rounded-full gap-2 transition-all ${isCreator ? 'bg-secondary hover:bg-secondary/90 text-white border-transparent' : 'border-primary/20 hover:border-primary text-foreground'}`}
                onClick={() => {
                  switchRole();
                  if (!isCreator) {
                    router.push("/dashboard/creator");
                  }
                }}
              >
                <RefreshCcw className={`h-4 w-4 ${isCreator ? 'animate-spin-once' : ''}`} />
                <span>{isCreator ? "Creator Mode" : "Customer Mode"}</span>
              </Button>
            )}

            {/* Favorites */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full ml-1 border border-border/50 bg-secondary/5">
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-xl border-border/50 backdrop-blur-xl bg-white/95">
                  <div className="px-2 py-3 mb-2 bg-secondary/10 rounded-xl">
                    <p className="text-sm font-semibold">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                  </div>

                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/profile">Profile & Settings</Link>
                  </DropdownMenuItem>

                  {isCreator && (
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/dashboard/creator">Creator Dashboard</Link>
                    </DropdownMenuItem>
                  )}

                  {!isCreator && (
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-destructive focus:text-destructive rounded-lg cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="rounded-full px-6 font-semibold">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}