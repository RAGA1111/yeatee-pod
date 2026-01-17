"use client";

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function ShopPage() {
    const [priceRange, setPriceRange] = useState([0, 50]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.sellingPrice >= priceRange[0] && product.sellingPrice <= priceRange[1];
        // Mock category logic since product doesn't have categoryId in the interface yet
        // We'll just assume all match if no category selected
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes('all');

        return matchesSearch && matchesPrice && matchesCategory;
    });

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Mobile Filter Trigger */}
                <div className="md:hidden mb-4 flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 space-y-6">
                                {/* Mobile Filters Content - Duplicated for simplicity */}
                                <div>
                                    <h3 className="font-semibold mb-4">Categories</h3>
                                    <div className="space-y-3">
                                        {categories.map(cat => (
                                            <div key={cat.id} className="flex items-center space-x-2">
                                                <Checkbox id={`m-${cat.id}`} />
                                                <label htmlFor={`m-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {cat.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Filters</h3>
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-secondary/5"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <div key={cat.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={cat.id}
                                        checked={selectedCategories.includes(cat.id)}
                                        onCheckedChange={(checked: boolean | "indeterminate") => {
                                            if (checked === true) setSelectedCategories([...selectedCategories, cat.id]);
                                            else setSelectedCategories(selectedCategories.filter(c => c !== cat.id));
                                        }}
                                    />
                                    <label htmlFor={cat.id} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                                        {cat.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Price Range</h4>
                            <span className="text-xs text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
                        </div>
                        <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={1}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="py-4"
                        />
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Shop All</h1>
                        <p className="text-muted-foreground text-sm">{filteredProducts.length} results</p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-secondary/5 rounded-xl border border-dashed border-secondary/20">
                            <h3 className="text-lg font-semibold text-muted-foreground">No products found</h3>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchQuery("");
                                    setPriceRange([0, 100]);
                                    setSelectedCategories([]);
                                }}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
