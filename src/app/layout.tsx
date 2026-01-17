import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { UserProvider } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: 'Yeatee POD',
  description: 'Fundamental Print on Demand System',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white text-slate-900`}>
        <Providers>
          <UserProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
