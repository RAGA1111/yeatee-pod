"use client";

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Truck, Package, DollarSign, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { orders } from '@/lib/data'
import { useUser } from '@/contexts/UserContext'

export default function OrderPage({ params }: { params: { id: string } }) {
    // In a real app we would use `use` or await properties of params, but for this mock we just grab the first order
    // to simulate a detail view, since we don't have real routing set up for dynamic IDs in this static demo.
    const mockOrder = orders[0];
    const { currentUser } = useUser();

    if (!mockOrder) return <div className="p-8">Order not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">

                <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="space-y-6">
                    {/* Status Card */}
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="pt-6 text-center space-y-4">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-2">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-green-900">Order Confirmed!</h1>
                                <p className="text-green-700">Order #1234-5678</p>
                            </div>
                            <div className="flex justify-center gap-8 text-sm pt-4">
                                <div className="flex flex-col items-center gap-1 text-green-800">
                                    <span className="font-semibold">Est. Delivery</span>
                                    <span>Jan 24 - Jan 26</span>
                                </div>
                                <div className="h-full w-px bg-green-200" />
                                <div className="flex flex-col items-center gap-1 text-green-800">
                                    <span className="font-semibold">Vendor</span>
                                    <span>PrintFul (Premium)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {mockOrder.items.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-gray-100 flex-shrink-0">
                                        <Image src={item.product.designImage} alt={item.product.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between font-medium">
                                            <h3>{item.product.title}</h3>
                                            <span>${item.product.sellingPrice}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{item.color} • {item.size} • Qty {item.quantity}</p>
                                    </div>
                                </div>
                            ))}

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${(mockOrder.totalAmount / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>$5.99</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>${((mockOrder.totalAmount / 100) + 5.99).toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logic Transparency Node (The "Good Student" Feature) */}
                    <Card className="bg-slate-50 border-dashed">
                        <CardHeader>
                            <CardTitle className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Supply Chain Logic
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                                This order was automatically routed to <strong>PrintFul</strong> because the requested <strong>Premium</strong> quality tier requires a vendor with &gt;98% reliability score in the <strong>US East</strong> region.
                            </div>

                            {/* Only show profit breakdown if User is the Creator (or Admin) */}
                            {currentUser?.role === 'CREATOR' && (
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                    <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4" /> Creator Profit Breakdown
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4 text-sm text-yellow-800">
                                        <div>
                                            <span className="block opacity-70">Revenue</span>
                                            <span className="font-bold">${((mockOrder.totalAmount / 100) + 5.99).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span className="block opacity-70">Costs</span>
                                            <span className="font-bold">-$15.50</span>
                                        </div>
                                        <div>
                                            <span className="block opacity-70">Net Profit</span>
                                            <span className="font-bold text-green-600">+$12.49</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
