"use client";

import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    User as UserIcon,
    Settings,
    MapPin,
    CreditCard,
    History,
    Heart,
    Store,
    BarChart3,
    DollarSign,
    Lock,
    LogOut,
    Palette,
    ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from "next-auth/react";

export default function ProfilePage() {
    const { currentUser, isCreator, switchRole } = useUser();
    const [loading, setLoading] = useState(false);

    if (!currentUser) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                    <Link href="/login">
                        <Button>Go to Login</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar / Left Col - Identity */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm text-center bg-gradient-to-b from-secondary/5 to-transparent">
                        <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-sm mb-4">
                            {currentUser.image ? (
                                <img src={currentUser.image} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                    <UserIcon className="w-10 h-10" />
                                </div>
                            )}
                        </div>

                        <h1 className="text-xl font-bold text-foreground mb-1">{currentUser.name}</h1>
                        <p className="text-sm text-muted-foreground mb-4">{currentUser.email}</p>

                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {currentUser.role} ACCOUNT
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            Member since {new Date(currentUser.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Role Management</h3>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {isCreator ? <Palette className="w-4 h-4 text-primary" /> : <ShoppingBag className="w-4 h-4 text-secondary" />}
                                <Label htmlFor="role-mode" className="font-medium">
                                    {isCreator ? 'Creator Mode' : 'Customer Mode'}
                                </Label>
                            </div>
                            <Switch
                                id="role-mode"
                                checked={isCreator}
                                onCheckedChange={switchRole}
                                className="data-[state=checked]:bg-primary"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                            Toggle to switch between your shopping profile and your creator workspace.
                        </p>
                    </div>
                </div>

                {/* Main Content - Right Col */}
                <div className="w-full md:w-2/3 space-y-8">

                    {/* Header */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">My Profile</h2>
                        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                    </div>

                    {/* Conditional Sections based on Role */}

                    {/* CUSTOMER SECTION */}
                    {!isCreator && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="bg-white p-5 rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex items-center justify-between mb-3">
                                        <History className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-muted-foreground">ORDERS</span>
                                    </div>
                                    <h3 className="text-lg font-bold">Order History</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Track return & check status</p>
                                    <Link href="/orders" className="absolute inset-0" />
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex items-center justify-between mb-3">
                                        <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-muted-foreground">WISHLIST</span>
                                    </div>
                                    <h3 className="text-lg font-bold">Saved Items</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Your favorite designs</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-muted-foreground" /> Saved Addresses
                                </h3>
                                <div className="space-y-4">
                                    {/* Mock Address */}
                                    <div className="flex items-start justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                                        <div>
                                            <p className="font-medium text-sm">Home</p>
                                            <p className="text-sm text-muted-foreground">123 Seaside Blvd, Suite 400<br />San Diego, CA 92101</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full border-dashed">+ Add New Address</Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" /> Payment Methods
                                </h3>
                                <div className="p-4 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-200">
                                    <p className="text-sm text-muted-foreground">No payment methods saved.</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* CREATOR SECTION */}
                    {isCreator && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-white p-5 rounded-xl border border-border hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <Store className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Shop Status</p>
                                    <h3 className="text-2xl font-bold mt-1 text-green-600">Live</h3>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-border hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <Palette className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Total Products</p>
                                    <h3 className="text-2xl font-bold mt-1">12</h3>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-border hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Earnings</p>
                                    <h3 className="text-2xl font-bold mt-1">$1,240.50</h3>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border border-primary/10">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Creator Dashboard</h3>
                                        <p className="text-sm text-muted-foreground mb-4">View detailed analytics, manage orders, and upload new designs.</p>
                                        <Link href="/dashboard/creator">
                                            <Button className="font-semibold shadow-lg shadow-primary/20">
                                                <BarChart3 className="w-4 h-4 mr-2" /> Go to Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="hiddensm:block">
                                        {/* Maybe an abstract shape or icon here */}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Shop Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Shop Visibility</Label>
                                            <p className="text-sm text-muted-foreground">Make your shop visible to the public marketplace.</p>
                                        </div>
                                        <Switch checked={true} />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Order Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive emails when you get a new order.</p>
                                        </div>
                                        <Switch checked={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Security - Common */}
                    <div className="bg-white rounded-xl border border-border p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-muted-foreground" /> Security & Login
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="w-full">
                                    <Label htmlFor="email" className="mb-1.5 block">Email Address</Label>
                                    <Input id="email" value={currentUser.email} disabled className="bg-secondary/5" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="password" className="mb-1.5 block">Password</Label>
                                    <Button variant="outline" className="w-full justify-between">
                                        •••••••••••••
                                        <span className="text-xs text-muted-foreground ml-2">Change</span>
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex justify-between items-center pt-2">
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                                    Deactivate Account
                                </Button>
                                <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>
                                    <LogOut className="w-4 h-4 mr-2" /> Log Out
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
