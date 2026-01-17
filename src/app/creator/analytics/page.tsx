"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatorLayout } from "@/components/CreatorLayout";
import { useUser } from "@/contexts/UserContext";

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalRevenue: 15420.50,
    totalProfit: 6230.75,
    totalSales: 567,
    totalViews: 12450,
    revenueChange: 12.5,
    profitChange: 8.3,
    salesChange: -2.1,
    viewsChange: 15.7
  },
  salesData: [
    { month: "Jan", sales: 45, revenue: 1250.50, profit: 520.25 },
    { month: "Feb", sales: 52, revenue: 1420.75, profit: 580.50 },
    { month: "Mar", sales: 48, revenue: 1380.25, profit: 550.75 },
    { month: "Apr", sales: 61, revenue: 1680.90, profit: 680.40 },
    { month: "May", sales: 73, revenue: 1950.30, profit: 790.15 },
    { month: "Jun", sales: 89, revenue: 2450.80, profit: 990.40 },
    { month: "Jul", sales: 95, revenue: 2650.00, profit: 1070.00 },
    { month: "Aug", sales: 104, revenue: 2890.50, profit: 1165.25 }
  ],
  topProducts: [
    { id: "1", title: "Vintage Retro Design", sales: 45, revenue: 1349.55, profit: 562.50 },
    { id: "2", title: "Minimalist Logo Tee", sales: 23, revenue: 574.77, profit: 201.17 },
    { id: "4", title: "Nature Inspired", sales: 67, revenue: 1877.33, profit: 686.75 },
    { id: "5", title: "Urban Street Art", sales: 34, revenue: 1019.66, profit: 357.38 },
    { id: "6", title: "Motivational Quote", sales: 28, revenue: 839.72, profit: 293.90 }
  ],
  recentOrders: [
    { id: "ORD-001", product: "Vintage Retro Design", customer: "John Doe", amount: 29.99, profit: 12.50, date: "2024-01-20", status: "completed" },
    { id: "ORD-002", product: "Nature Inspired", customer: "Jane Smith", amount: 27.99, profit: 10.25, date: "2024-01-19", status: "completed" },
    { id: "ORD-003", product: "Minimalist Logo Tee", customer: "Bob Johnson", amount: 24.99, profit: 8.75, date: "2024-01-19", status: "shipped" },
    { id: "ORD-004", product: "Vintage Retro Design", customer: "Alice Brown", amount: 29.99, profit: 12.50, date: "2024-01-18", status: "processing" },
    { id: "ORD-005", product: "Urban Street Art", customer: "Charlie Wilson", amount: 29.99, profit: 10.50, date: "2024-01-18", status: "completed" }
  ]
};

export default function AnalyticsPage() {
  const { currentUser } = useUser();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const { overview, salesData, topProducts, recentOrders } = mockAnalytics;

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>;
      case "shipped":
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Shipped</span>;
      case "processing":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Processing</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  return (
    <CreatorLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your performance and sales insights</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                onClick={() => setTimeRange("7d")}
              >
                7 Days
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                onClick={() => setTimeRange("30d")}
              >
                30 Days
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                onClick={() => setTimeRange("90d")}
              >
                90 Days
              </Button>
              <Button
                variant={timeRange === "1y" ? "default" : "outline"}
                onClick={() => setTimeRange("1y")}
              >
                1 Year
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{overview.totalRevenue.toFixed(2)}</p>
                    <div className={`flex items-center text-sm ${getChangeColor(overview.revenueChange)}`}>
                      {getChangeIcon(overview.revenueChange)}
                      <span className="ml-1">{Math.abs(overview.revenueChange)}%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Profit</p>
                    <p className="text-2xl font-bold text-gray-900">₹{overview.totalProfit.toFixed(2)}</p>
                    <div className={`flex items-center text-sm ${getChangeColor(overview.profitChange)}`}>
                      {getChangeIcon(overview.profitChange)}
                      <span className="ml-1">{Math.abs(overview.profitChange)}%</span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">{overview.totalSales}</p>
                    <div className={`flex items-center text-sm ${getChangeColor(overview.salesChange)}`}>
                      {getChangeIcon(overview.salesChange)}
                      <span className="ml-1">{Math.abs(overview.salesChange)}%</span>
                    </div>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">{overview.totalViews.toLocaleString()}</p>
                    <div className={`flex items-center text-sm ${getChangeColor(overview.viewsChange)}`}>
                      {getChangeIcon(overview.viewsChange)}
                      <span className="ml-1">{Math.abs(overview.viewsChange)}%</span>
                    </div>
                  </div>
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Chart (Mock) */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {salesData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.sales / 110) * 200}px` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                      <span className="text-xs font-medium">{data.sales}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.title}</p>
                          <p className="text-xs text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{product.revenue.toFixed(2)}</p>
                        <p className="text-xs text-green-600">₹{product.profit.toFixed(2)} profit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Profit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.product}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">₹{order.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-green-600">₹{order.profit.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CreatorLayout>
  );
}