"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, BarChart3, Package, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { CreatorLayout } from "@/components/CreatorLayout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { useUser } from "@/contexts/UserContext";
import { Edit, Eye, Ban } from "lucide-react";

export default function HomePage() {
  // Main entry point for the home page
  const { isCreator, currentUser } = useUser();

  if (isCreator && currentUser) {
    // Creator Home Page
    const creatorProducts = products.filter(p => p.creatorId === currentUser.id);

    return (
      <CreatorLayout>
        <div className="p-8">
          {/* Creator Profile Card */}
          <div className="mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentUser.name}
                    </h2>
                    <p className="text-gray-600">{currentUser.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {currentUser.brand?.name || "Independent Creator"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creatorProducts.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active listings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(creatorProducts.length * 1500).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Lifetime revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(creatorProducts.length * 600).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Net earnings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Listings */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Listings</h3>
              <Link href="/creator/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </div>

            {creatorProducts.length > 0 ? (
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 font-medium text-gray-500">Product</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Price</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Units Sold</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Net Profit</th>
                      <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {creatorProducts.slice(0, 10).map((product) => {
                      // Mock metrics per product
                      const unitsSold = Math.floor(Math.random() * 100) + 5;
                      const profitPerUnit = product.sellingPrice - 15; // Mock cost calc
                      const totalProfit = unitsSold * profitPerUnit;

                      return (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-lg bg-gray-100 relative overflow-hidden">
                                <Image
                                  src={product.designImage}
                                  alt=""
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </div>
                              <span className="font-medium text-gray-900">{product.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                              {product.isActive ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-900">₹{product.sellingPrice}</td>
                          <td className="px-6 py-4 text-gray-500">{unitsSold}</td>
                          <td className="px-6 py-4 text-green-600 font-medium">₹{totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="sm" title="View">
                                <Eye className="h-4 w-4 text-gray-500" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Edit">
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Disable">
                                <Ban className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card className="bg-gray-50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Create your first product to start selling on the marketplace.
                  </p>
                  <Link href="/creator/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CreatorLayout>
    );
  }

  // Customer Marketplace
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      {/* Hero / Welcome Message (Subtle, like Etsy) */}
      <section className="bg-orange-50/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            Find unique things you'll love. Support independent creators.
          </h1>
          <div className="flex justify-center gap-4 mt-4 text-sm font-medium text-gray-600">
            <span className="cursor-pointer hover:text-orange-600 transition-colors">Gift Ideas</span>
            <span className="cursor-pointer hover:text-orange-600 transition-colors">Best Selling</span>
            <span className="cursor-pointer hover:text-orange-600 transition-colors">New Arrivals</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      {/* Categories - Circular/Clean */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/search?category=${category.id}`} className="group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-all ring-2 ring-transparent group-hover:ring-orange-200">
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      {/* Using a placeholder if image fails, or just the image */}
                      <div className="w-full h-full bg-gray-200"></div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900 group-hover:underline decoration-orange-600 decoration-2 underline-offset-4">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 15).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
