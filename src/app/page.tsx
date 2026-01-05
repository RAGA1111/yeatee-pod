"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { useUser } from "@/contexts/UserContext";

export default function HomePage() {
  const { isCreator, currentUser } = useUser();

  if (isCreator && currentUser) {
    // Creator Home Page
    const creatorProducts = products.filter(p => p.creatorId === currentUser.id);

    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Brand Header */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={currentUser.brand?.banner || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"}
                  alt="Brand banner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentUser.brand?.name || `${currentUser.name}'s Store`}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {currentUser.brand?.description || currentUser.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Profile Card */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={currentUser.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
                    alt={currentUser.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <p className="text-gray-600">{currentUser.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Your Products</h2>
              <div className="flex space-x-4">
                <Link href="/creator/design">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Design
                  </Button>
                </Link>
                <Link href="/dashboard/creator">
                  <Button variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Sales Analytics
                  </Button>
                </Link>
              </div>
            </div>
            {creatorProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creatorProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You haven't created any products yet.</p>
                <Link href="/creator/design">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Design
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Customer Home Page
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover custom & trendy T-shirts made for you
              </h1>
              <p className="text-xl text-gray-600">
                Find unique designs from independent creators worldwide
              </p>
              <Button size="lg" className="text-lg px-8 py-3">
                Shop Tees
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
                  alt="T-shirt collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.id}`}
                className="group"
              >
                <div className="relative h-32 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-medium text-sm text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Tees</h2>
            <Link href="/search">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
