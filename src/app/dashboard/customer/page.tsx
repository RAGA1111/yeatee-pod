"use client";

import { useMemo } from "react";
import { Heart, ShoppingBag, Package, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useUser } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import { orders, products } from "@/lib/data";

export default function CustomerDashboard() {
  const { currentUser } = useUser();
  const { addItem } = useCart();

  const customerOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(order => order.customerId === currentUser.id);
  }, [currentUser]);

  const wishlist = useMemo(() => {
    if (!currentUser) return [];
    // Mock wishlist - in real app this would come from user data
    return products.slice(0, 4); // Just showing first 4 products as wishlist
  }, [currentUser]);

  const orderStats = useMemo(() => {
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalItems = customerOrders.reduce((sum, order) => sum + order.items.length, 0);
    const deliveredOrders = customerOrders.filter(order => order.status === "delivered").length;

    return {
      totalOrders: customerOrders.length,
      totalSpent,
      totalItems,
      deliveredOrders
    };
  }, [customerOrders]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser.name}!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {orderStats.deliveredOrders} delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{orderStats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ₹{(orderStats.totalSpent / Math.max(orderStats.totalOrders, 1)).toFixed(0)} avg order
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Purchased</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.totalItems}</div>
              <p className="text-xs text-muted-foreground">
                From {new Set(customerOrders.flatMap(order => order.items.map(item => item.productId))).size} products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlist.length}</div>
              <p className="text-xs text-muted-foreground">
                Items saved
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {customerOrders.length === 0 ? (
                <p className="text-muted-foreground">No orders yet. Start shopping!</p>
              ) : (
                <div className="space-y-4">
                  {customerOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Order #{order.id.slice(-6)}</h4>
                        <Badge variant={
                          order.status === "delivered" ? "default" :
                          order.status === "processing" ? "secondary" :
                          order.status === "shipped" ? "outline" : "destructive"
                        }>
                          {order.status}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground mb-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>

                      <div className="space-y-1">
                        {order.items.map((item) => {
                          const product = products.find(p => p.id === item.productId);
                          return (
                            <div key={item.productId} className="flex justify-between text-sm">
                              <span>{product?.title || "Unknown Product"} (x{item.quantity})</span>
                              <span>₹{product?.sellingPrice ? product.sellingPrice * item.quantity : 0}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlist.length === 0 ? (
                <p className="text-muted-foreground">Your wishlist is empty. Browse products to add some!</p>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{product.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {product.creator?.name || "Unknown Creator"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">₹{product.sellingPrice}</div>
                        <Button
                          size="sm"
                          onClick={() => addItem(product, product.colors[0])}
                        >
                          Add to Cart
                        </Button>
                      </div>

                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({Math.floor(Math.random() * 50) + 10})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingBag className="h-6 w-6 mb-2" />
                <span>Continue Shopping</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Package className="h-6 w-6 mb-2" />
                <span>Track Orders</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Heart className="h-6 w-6 mb-2" />
                <span>Browse Wishlist</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}