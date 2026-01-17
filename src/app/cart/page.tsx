"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { products } from "@/lib/data";
import { runDecisionEngine } from "@/lib/decisionEngine";

// Mock Cart Data
const initialCartItems = [
  {
    id: "cart-1",
    product: products[0],
    color: "NAVY",
    size: "L",
    quantity: 1,
    price: products[0].sellingPrice
  },
  {
    id: "cart-2",
    product: products[2],
    color: "BLACK",
    size: "M",
    quantity: 2,
    price: products[2].sellingPrice
  }
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(initialCartItems);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Run Decision Engine for each item (simplification: just run for first item for demo explanation)
    // In real app, we'd batch or run per line item.
    // We will pass the decision result to the order page via query param or simple state storage mock

    const decisionInput = {
      tshirtType: items[0].product.tshirtType,
      color: items[0].color,
      quantity: items[0].quantity,
      creatorProfitGoal: 10 // Mock goal
    };

    const decision = runDecisionEngine(decisionInput);

    // Store decision for the order page (using localStorage for persistence across nav in this mock)
    localStorage.setItem("lastOrderDecision", JSON.stringify(decision));

    // Navigate to "Order Confirmation" which is the Status page
    router.push("/orders/new-order-123");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex gap-4">
                  <div className="h-24 w-24 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.designImage}
                      alt={item.product.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.product.title}</h3>
                      <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                      <p className="text-sm font-medium mt-1">${item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </Button>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                  {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by Stripe (Mock)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}