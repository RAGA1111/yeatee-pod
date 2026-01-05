"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/lib/data";
import { useUser } from "@/contexts/UserContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isCreator } = useUser();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add with default color
    addItem(product, product.colors[0]);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <Image
            src={product.designImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {product.tshirtType}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">${product.sellingPrice}</span>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{product.creator.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: color.toLowerCase(),
                }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>

          <Button
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={isCreator} // Creators can't buy their own products
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isCreator ? "Your Product" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}