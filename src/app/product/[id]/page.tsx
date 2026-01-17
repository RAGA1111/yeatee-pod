"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock additional images for gallery
  const images = [
    product.designImage,
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
  ];

  const relatedProducts = products
    .filter(p => p.creatorId === product.creatorId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src={images[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? "border-primary" : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating || 4.5}</span>
                  <span className="text-muted-foreground">(128 reviews)</span>
                </div>
                {product.isPopular && (
                  <Badge variant="secondary">Popular</Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">${product.sellingPrice}</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                This premium cotton t-shirt features a comfortable fit and high-quality print.
                Perfect for everyday wear or as a gift. Made with sustainable materials and
                printed using eco-friendly inks.
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-primary" : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="flex-1" size="lg" onClick={() => addItem(product, selectedColor, quantity)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
              <Button variant="ghost" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Shipping & Returns</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100. Easy returns within 30 days.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  Machine wash cold, tumble dry low. Do not bleach.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}