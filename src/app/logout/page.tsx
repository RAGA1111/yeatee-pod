"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    async function handleLogout() {
        await signOut({ callbackUrl: "/login" });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />

            <div className="w-full max-w-sm p-8 relative z-10 animate-in fade-in zoom-in duration-300">
                <div className="bg-card border border-border shadow-2xl rounded-2xl p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6 text-destructive">
                        <LogOut size={32} />
                    </div>

                    <h1 className="text-xl font-bold mb-2">Sign Out?</h1>
                    <p className="text-muted-foreground mb-8">Are you sure you want to end your session?</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-destructive text-destructive-foreground font-medium py-3 rounded-lg hover:bg-destructive/90 transition-colors"
                        >
                            Yes, Sign Out
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="w-full bg-secondary text-secondary-foreground font-medium py-3 rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
