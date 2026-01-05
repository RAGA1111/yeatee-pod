"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Move, RotateCw, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";

const TSHIRT_COLORS = [
  { name: "WHITE", hex: "#ffffff" },
  { name: "BLACK", hex: "#000000" },
  { name: "GRAY", hex: "#808080" },
  { name: "NAVY", hex: "#000080" },
  { name: "RED", hex: "#ff0000" },
];

export default function DesignStudio() {
  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 50 });
  const [designScale, setDesignScale] = useState(1);
  const [designRotation, setDesignRotation] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [sellingPrice, setSellingPrice] = useState(25);
  const [desiredProfit, setDesiredProfit] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDesignImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.clientX && e.clientY) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setDesignPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }
  };

  // Mock cost calculations
  const vendorCost = selectedColor.name === "WHITE" ? 5 : 6;
  const printingCost = 3;
  const platformFee = sellingPrice * 0.1;
  const totalCost = vendorCost + printingCost + platformFee;
  const calculatedProfit = sellingPrice - totalCost;
  const isProfitFeasible = calculatedProfit >= desiredProfit;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Design Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Design Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full max-w-md mx-auto">
                  {/* T-shirt Mock */}
                  <div
                    className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
                    style={{ backgroundColor: selectedColor.hex }}
                    onDragOver={handleDragStart}
                    onDrop={handleDrag}
                  >
                    {/* T-shirt shape overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

                    {/* Design overlay */}
                    {designImage && (
                      <div
                        className="absolute cursor-move"
                        style={{
                          left: `${designPosition.x}%`,
                          top: `${designPosition.y}%`,
                          transform: `translate(-50%, -50%) scale(${designScale}) rotate(${designRotation}deg)`,
                          transformOrigin: 'center',
                        }}
                        draggable
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                      >
                        <Image
                          src={designImage}
                          alt="Design"
                          width={100}
                          height={100}
                          className="object-contain"
                          style={{ maxWidth: '80px', maxHeight: '80px' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Color Variants */}
                  <div className="flex justify-center gap-2 mt-4">
                    {TSHIRT_COLORS.map((color) => (
                      <button
                        key={color.name}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor.name === color.name ? 'border-primary' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Design Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="scale">Scale</Label>
                  <Input
                    id="scale"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={designScale}
                    onChange={(e) => setDesignScale(parseFloat(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="rotation">Rotation</Label>
                  <Input
                    id="rotation"
                    type="range"
                    min="0"
                    max="360"
                    value={designRotation}
                    onChange={(e) => setDesignRotation(parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Design
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details & Pricing */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <Label>Selected Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {TSHIRT_COLORS.map((color) => (
                      <Badge key={color.name} variant="secondary">
                        {color.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Profit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Selling Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profit">Desired Profit ($)</Label>
                    <Input
                      id="profit"
                      type="number"
                      value={desiredProfit}
                      onChange={(e) => setDesiredProfit(parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span>Selling Price</span>
                    <span>${sellingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>- Vendor Tee Cost</span>
                    <span>${vendorCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>- Printing Cost</span>
                    <span>${printingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>- Platform Fee</span>
                    <span>${platformFee.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className={`flex justify-between font-semibold ${isProfitFeasible ? 'text-green-600' : 'text-red-600'}`}>
                    <span>Estimated Creator Profit</span>
                    <span>${calculatedProfit.toFixed(2)}</span>
                  </div>
                  {!isProfitFeasible && (
                    <p className="text-sm text-red-600">
                      Profit is below desired amount. Consider increasing selling price.
                    </p>
                  )}
                </div>

                <Button
                  className="w-full"
                  disabled={!designImage || !productTitle || !isProfitFeasible}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Publish Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}