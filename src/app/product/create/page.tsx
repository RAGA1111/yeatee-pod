"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createProduct } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowRight, Check, TrendingUp, Truck, Printer } from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { products } from '@/lib/data';

// Mock Designs (In real app, fetch from DB)
const MOCK_DESIGNS = [
    { id: 'd1', title: 'Summer Sunset', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
    { id: 'd2', title: 'Abstract Waves', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80' },
    { id: 'd3', title: 'Typography Art', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80' },
];

// Optimization Engine Logic (Client-side simulation of lib/decisionEngine)
const calculateOptimization = (profitMargin: number, quality: 'BASIC' | 'PREMIUM', quantity: number) => {
    // Base costs
    const baseShirtCost = quality === 'PREMIUM' ? 12.00 : 8.00;
    const printCost = quantity > 50 ? 3.50 : 5.00; // Bulk discount logic
    const platformFee = 2.00;

    // Vendor Logic
    const vendor = quality === 'PREMIUM' ?
        { name: 'PrintFul (Premium)', eta: '2-3 days', reliability: 'High' } :
        { name: 'Printify (Economy)', eta: '4-5 days', reliability: 'Medium' };

    // Printer Logic
    const printer = quantity > 20 ?
        { name: 'Aeoon Kymos (Industrial)', speed: 'Very Fast' } :
        { name: 'Brother GTX (Direct)', speed: 'Standard' };

    const totalBaseCost = baseShirtCost + printCost + platformFee;
    const recommendedPrice = totalBaseCost + profitMargin;

    return {
        costs: {
            baseShirt: baseShirtCost,
            print: printCost,
            platform: platformFee,
            total: totalBaseCost
        },
        vendor,
        printer,
        recommendedPrice
    };
};

export default function CreateProductPage() {
    const [step, setStep] = useState(1);
    const [selectedDesign, setSelectedDesign] = useState(MOCK_DESIGNS[0]);
    const [config, setConfig] = useState({
        title: "",
        quality: 'BASIC' as 'BASIC' | 'PREMIUM',
        targetProfit: 10, // User wants $10 profit per shirt
        colors: ['White'],
    });
    const [isPublishing, setIsPublishing] = useState(false);

    // Live Calculation
    const optimization = useMemo(() => {
        return calculateOptimization(config.targetProfit, config.quality, 1); // optimizing for single unit sales primarily
    }, [config.targetProfit, config.quality]);

    const handlePublish = async () => {
        setIsPublishing(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 2000));
        // Redirect
        window.location.href = '/dashboard/creator';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-12 container mx-auto px-4 max-w-5xl">

                {/* Progress Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">Launch Configuration</h1>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <span className={step === 1 ? "text-primary" : ""}>1. Design</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className={step === 2 ? "text-primary" : ""}>2. Optimization</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className={step === 3 ? "text-primary" : ""}>3. Review</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Configuration Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Step 1: Design Selection */}
                        {step === 1 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Select Design Source</CardTitle>
                                    <CardDescription>Choose from your uploaded designs.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {MOCK_DESIGNS.map(d => (
                                            <div
                                                key={d.id}
                                                onClick={() => setSelectedDesign(d)}
                                                className={`cursor-pointer group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedDesign.id === d.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-gray-200'}`}
                                            >
                                                <Image src={d.url} alt={d.title} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm">Select</span>
                                                </div>
                                                {selectedDesign.id === d.id && (
                                                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => window.location.href = '/design/upload'}>
                                            <span className="text-4xl mb-2">+</span>
                                            <span className="text-sm font-medium">Upload New</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <Button onClick={() => setStep(2)}>Next: Profit Optimization</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}


                        {/* Step 2: Optimization Engine */}
                        {step === 2 && (
                            <Card className="overflow-hidden border-primary/20 shadow-lg">
                                <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                        Profit Optimization Engine
                                    </CardTitle>
                                    <CardDescription>
                                        We automatically select the best supply chain based on your constraints.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">

                                    <div className="space-y-4">
                                        <Label className="text-base font-semibold">1. Set Your Goals</Label>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label>Product Quality Tier</Label>
                                                <Tabs defaultValue="BASIC" onValueChange={(v) => setConfig({ ...config, quality: v as any })} className="w-full">
                                                    <TabsList className="w-full">
                                                        <TabsTrigger value="BASIC" className="flex-1">Basic (Std)</TabsTrigger>
                                                        <TabsTrigger value="PREMIUM" className="flex-1">Premium (Heavy)</TabsTrigger>
                                                    </TabsList>
                                                </Tabs>
                                                <p className="text-xs text-muted-foreground">
                                                    {config.quality === 'BASIC' ? 'Standard 100% cotton. Best for bulk.' : 'Heavyweight, combed ring-spun cotton. Best for brands.'}
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <Label>Desired Profit per Sale</Label>
                                                    <span className="text-green-600 font-bold">${config.targetProfit.toFixed(2)}</span>
                                                </div>
                                                <Slider
                                                    value={[config.targetProfit]}
                                                    onValueChange={([v]) => setConfig({ ...config, targetProfit: v })}
                                                    min={5}
                                                    max={50}
                                                    step={0.5}
                                                    className="py-1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* The "Machine" Output */}
                                    <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <Label className="text-base font-semibold text-secondary">🤖 AI Supply Chain Selection</Label>
                                            <Badge variant="outline" className="bg-white text-green-600 border-green-200">Optimal Path Found</Badge>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                    <Truck className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-medium uppercase">Best Vendor</p>
                                                    <p className="font-bold text-sm">{optimization.vendor.name}</p>
                                                    <p className="text-xs text-green-600">{optimization.vendor.eta} shipping</p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                                <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                                                    <Printer className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-medium uppercase">Best Printer</p>
                                                    <p className="font-bold text-sm">{optimization.printer.name}</p>
                                                    <p className="text-xs text-green-600">{optimization.printer.speed} turnaround</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                        <Button onClick={() => setStep(3)}>Next: Review & Publish</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 3: Final Review */}
                        {step === 3 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Launch Summary</CardTitle>
                                    <CardDescription>Review your product before going live.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border">
                                        <div className="h-20 w-20 relative bg-white rounded-md flex-shrink-0 border">
                                            <Image src={selectedDesign.url} alt="Design" fill className="object-cover rounded-md" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Untitled Product</h3>
                                            <p className="text-sm text-muted-foreground">Using design: {selectedDesign.title}</p>
                                            <p className="text-sm text-muted-foreground">{config.quality} Quality • {config.targetProfit} Profit Margin</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Final Product Title</Label>
                                        <Input
                                            placeholder="Give it a catchy name..."
                                            value={config.title}
                                            onChange={(e) => setConfig({ ...config, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                                        <Button onClick={handlePublish} disabled={!config.title || isPublishing}>
                                            {isPublishing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                                            {isPublishing ? 'Launching...' : 'Publish Product'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                    </div>

                    {/* Live Preview Sidebar (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <h3 className="font-bold text-lg px-1">Live Profit Breakdown</h3>

                            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                                <div className="p-6 text-center bg-gray-50 border-b">
                                    <p className="text-sm text-muted-foreground mb-1">Recommended Selling Price</p>
                                    <div className="text-4xl font-bold tracking-tight text-foreground">
                                        ${optimization.recommendedPrice.toFixed(2)}
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Base Shirt Cost</span>
                                            <span>${optimization.costs.baseShirt.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Print Cost</span>
                                            <span>${optimization.costs.print.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Platform Fee</span>
                                            <span>${optimization.costs.platform.toFixed(2)}</span>
                                        </div>
                                        <div className="h-px bg-gray-100 my-2" />
                                        <div className="flex justify-between text-base font-medium">
                                            <span>Total Cost</span>
                                            <span>${optimization.costs.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-green-800">Your Net Profit</span>
                                            <span className="text-lg font-bold text-green-700">+${config.targetProfit.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-center text-muted-foreground px-4">
                                * Prices are estimates based on real-time vendor availability. Final constraints locked at order time.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
