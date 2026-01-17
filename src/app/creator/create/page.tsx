"use client";

import { useState, useRef } from "react";
import { Upload, RotateCcw, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorLayout } from "@/components/CreatorLayout";
import { useUser } from "@/contexts/UserContext";

const TSHIRT_COLORS = [
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Black", value: "black", hex: "#000000" },
  { name: "Gray", value: "gray", hex: "#808080" },
  { name: "Navy", value: "navy", hex: "#000080" },
  { name: "Red", value: "red", hex: "#ff0000" },
];

export default function CreateProductPage() {
  const { currentUser } = useUser();
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>(["white"]);
  const [tshirtColor, setTshirtColor] = useState("white");
  const [sellingPrice, setSellingPrice] = useState(29.99);
  const [desiredProfit, setDesiredProfit] = useState(15.00);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 50 });
  const [designScale, setDesignScale] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock calculations
  const teeBaseCost = 8.50;
  const printingCost = 4.50;
  const platformFee = 2.00;
  const totalCost = teeBaseCost + printingCost + platformFee;
  const creatorProfit = sellingPrice - totalCost;
  const isProfitable = creatorProfit >= desiredProfit;

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

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const resetDesign = () => {
    setDesignPosition({ x: 50, y: 50 });
    setDesignScale(0.8);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Convert pixel delta to percentage
    const percentX = (deltaX / containerRect.width) * 100;
    const percentY = (deltaY / containerRect.height) * 100;

    setDesignPosition(prev => ({
      x: Math.min(100, Math.max(0, prev.x + percentX)),
      y: Math.min(100, Math.max(0, prev.y + percentY))
    }));

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const removeDesign = () => {
    setDesignImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePublish = () => {
    if (!designImage || !isProfitable) return;

    // Mock publish logic
    console.log("Publishing product:", {
      designImage,
      selectedColors,
      sellingPrice,
      creatorProfit,
      creatorId: currentUser?.id
    });

    alert("Product published successfully!");
  };

  return (
    <CreatorLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Left Controls Panel */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Design Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {designImage ? "Replace Image" : "Upload Design"}
                  </Button>

                  {designImage && (
                    <div className="space-y-4">
                      {/* Scale Control */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-xs">Size</Label>
                          <span className="text-xs text-gray-500">{Math.round(designScale * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={designScale}
                          onChange={(e) => setDesignScale(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={resetDesign}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset Position
                        </Button>
                        <Button
                          onClick={removeDesign}
                          variant="outline"
                          size="sm"
                          className="w-full text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Design
                        </Button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Max file size: 50MB. PNG or JPG recommended.
                  </p>
                </CardContent>
              </Card>

              {/* Color Variants */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {TSHIRT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleColorToggle(color.value)}
                        className={`relative w-12 h-12 rounded-lg border-2 transition-all ${selectedColors.includes(color.value)
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-300 hover:border-gray-400"
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColors.includes(color.value) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Select colors for your product variants
                  </p>
                </CardContent>
              </Card>

              {/* Pricing & Profit */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing & Profit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="selling-price">Selling Price (₹)</Label>
                    <Input
                      id="selling-price"
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="desired-profit">Desired Profit (₹)</Label>
                    <Input
                      id="desired-profit"
                      type="number"
                      value={desiredProfit}
                      onChange={(e) => setDesiredProfit(Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Profit Calculation */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Selling Price</span>
                      <span>₹{sellingPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>– Tee Base Cost</span>
                      <span>₹{teeBaseCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>– Printing Cost</span>
                      <span>₹{printingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>– Platform Fee</span>
                      <span>₹{platformFee.toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>= Creator Profit</span>
                      <span className={creatorProfit >= 0 ? "text-green-600" : "text-red-600"}>
                        ₹{creatorProfit.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {!isProfitable && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        ⚠️ Profit is below your desired amount. Consider increasing the selling price.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                className="w-full"
                disabled={!designImage || !isProfitable || selectedColors.length === 0}
              >
                <Save className="h-4 w-4 mr-2" />
                Publish Product
              </Button>
            </div>
          </div>

          {/* Right Preview Panel */}
          <div className="flex-1 p-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
                <div className="flex space-x-2">
                  {TSHIRT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTshirtColor(color.value)}
                      className={`w-8 h-8 rounded border-2 ${tshirtColor === color.value
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300"
                        }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="relative">
                  {/* T-shirt Base Image */}
                  <div
                    className="relative w-80 h-96 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                    style={{ backgroundColor: TSHIRT_COLORS.find(c => c.value === tshirtColor)?.hex || "#ffffff" }}
                  >
                    {/* Mock T-shirt shape */}
                    <div className="absolute inset-4 bg-white rounded-t-full"></div>

                    {/* Print Area (dashed rectangle) */}
                    <div
                      ref={containerRef}
                      className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 h-64 border-2 border-dashed border-gray-400 rounded overflow-hidden"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Design Overlay */}
                      {designImage && (
                        <div
                          className="absolute flex items-center justify-center cursor-move"
                          style={{
                            left: `${designPosition.x}%`,
                            top: `${designPosition.y}%`,
                            transform: `translate(-50%, -50%) scale(${designScale})`,
                            width: '100%',
                            height: '100%',
                            userSelect: 'none',
                          }}
                          onMouseDown={handleMouseDown}
                        >
                          <img
                            src={designImage}
                            alt="Design preview"
                            className="max-w-none pointer-events-none"
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {!designImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Upload a design to see preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
}