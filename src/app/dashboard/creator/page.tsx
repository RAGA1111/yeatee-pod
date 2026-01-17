"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Package, BarChart3, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useUser } from "@/contexts/UserContext";
import { products } from "@/lib/data";

export default function CreatorDashboard() {
  const { currentUser } = useUser();
  const router = useRouter();

  const creatorProducts = useMemo(() => {
    if (!currentUser) return [];
    return products.filter(p => p.creatorId === currentUser.id);
  }, [currentUser]);

  // Mock calculations - in real app, this would come from orders data
  const metrics = useMemo(() => {
    const totalUnitsSold = creatorProducts.reduce((sum, product) => sum + Math.floor(Math.random() * 50) + 10, 0);
    const totalRevenue = creatorProducts.reduce((sum, product) => sum + (product.sellingPrice * (Math.floor(Math.random() * 20) + 5)), 0);
    const totalProfit = totalRevenue * 0.3; // Mock 30% profit margin
    const averageRating = 4.5 + Math.random() * 0.5;

    return {
      totalUnitsSold,
      totalRevenue,
      totalProfit,
      averageRating,
      profitPerProduct: totalProfit / creatorProducts.length,
    };
  }, [creatorProducts]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login?callbackUrl=/dashboard/creator");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser.name}!</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units Sold</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalUnitsSold}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalRevenue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalProfit.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                30% average margin
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                ⭐⭐⭐⭐⭐
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Product Analytics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Product Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorProducts.map((product) => {
                const unitsSold = Math.floor(Math.random() * 30) + 5;
                const revenue = product.sellingPrice * unitsSold;
                const profit = revenue * 0.3;
                const avgRating = 4.2 + Math.random() * 0.8;

                return (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-3">{product.title}</h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Units Sold:</span>
                        <span className="font-medium">{unitsSold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium">${revenue.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Rating:</span>
                        <span className="font-medium">{avgRating.toFixed(1)} ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Profit:</span>
                        <span className="font-medium text-green-600">${profit.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mock orders data */}
                  {Array.from({ length: 10 }, (_, i) => {
                    const product = creatorProducts[i % creatorProducts.length];
                    const quantity = Math.floor(Math.random() * 5) + 1;
                    const profit = (product.sellingPrice * quantity) * 0.3;
                    const statuses = ["PLACED", "PRINTING", "SHIPPED", "DELIVERED"];

                    return (
                      <tr key={i} className="border-b">
                        <td className="py-2">#{1000 + i}</td>
                        <td className="py-2">{product.title}</td>
                        <td className="py-2">{quantity}</td>
                        <td className="py-2">
                          <Badge variant={
                            statuses[i % statuses.length] === "DELIVERED" ? "default" :
                              statuses[i % statuses.length] === "PLACED" ? "secondary" : "outline"
                          }>
                            {statuses[i % statuses.length]}
                          </Badge>
                        </td>
                        <td className="py-2 text-green-600">${profit.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}