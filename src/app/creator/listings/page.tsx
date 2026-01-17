"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreatorLayout } from "@/components/CreatorLayout";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

// Mock data for creator's products
const mockProducts = [
  {
    id: "1",
    title: "Vintage Retro Design",
    image: "/api/placeholder/300/300",
    status: "active",
    price: 29.99,
    sales: 45,
    profit: 12.50,
    createdAt: "2024-01-15",
    colors: ["white", "black", "navy"]
  },
  {
    id: "2",
    title: "Minimalist Logo Tee",
    image: "/api/placeholder/300/300",
    status: "active",
    price: 24.99,
    sales: 23,
    profit: 8.75,
    createdAt: "2024-01-10",
    colors: ["white", "gray"]
  },
  {
    id: "3",
    title: "Abstract Art Print",
    image: "/api/placeholder/300/300",
    status: "draft",
    price: 34.99,
    sales: 0,
    profit: 0,
    createdAt: "2024-01-20",
    colors: ["white", "black", "red"]
  },
  {
    id: "4",
    title: "Nature Inspired",
    image: "/api/placeholder/300/300",
    status: "active",
    price: 27.99,
    sales: 67,
    profit: 10.25,
    createdAt: "2024-01-05",
    colors: ["white", "navy", "gray"]
  }
];

export default function ListingsPage() {
  const { currentUser } = useUser();
  const [products, setProducts] = useState(mockProducts);
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");

  const filteredProducts = products.filter(product => {
    if (filter === "all") return true;
    return product.status === filter;
  });

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.sales * p.price), 0);
  const totalProfit = products.reduce((sum, p) => sum + (p.sales * p.profit), 0);

  return (
    <CreatorLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-1">Manage your products and track performance</p>
            </div>
            <Link href="/creator/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Product
              </Button>
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                <p className="text-sm text-gray-600">Total Products</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">{totalSales}</div>
                <p className="text-sm text-gray-600">Total Sales</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</div>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">₹{totalProfit.toFixed(2)}</div>
                <p className="text-sm text-gray-600">Total Profit</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All ({products.length})
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
            >
              Active ({products.filter(p => p.status === "active").length})
            </Button>
            <Button
              variant={filter === "draft" ? "default" : "outline"}
              onClick={() => setFilter("draft")}
            >
              Draft ({products.filter(p => p.status === "draft").length})
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(product.status)}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">₹{product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sales:</span>
                      <span className="font-medium">{product.sales}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Profit:</span>
                      <span className="font-medium text-green-600">₹{product.profit.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Color Variants */}
                  <div className="flex space-x-1 mb-4">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color === "white" ? "#ffffff" :
                                         color === "black" ? "#000000" :
                                         color === "gray" ? "#808080" :
                                         color === "navy" ? "#000080" :
                                         color === "red" ? "#ff0000" : "#ffffff"
                        }}
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {filter === "all" ? "Create your first product to get started." : `No ${filter} products found.`}
              </p>
              <Link href="/creator/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </CreatorLayout>
  );
}