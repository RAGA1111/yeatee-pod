"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, RotateCw, Palette, Image as ImageIcon, Scaling, Trash2, X, Move } from 'lucide-react';

// Image-based T-Shirt Component - uses multiply blend for coloring
const TshirtMockup = ({ color, children }: { color: string, children?: React.ReactNode }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center select-none bg-white">
            <div className="relative w-full max-w-[650px] aspect-[3/4] flex items-center justify-center">

                {/* Base white T-shirt image with transparent background */}
                <img
                    src="/tshirt-cutout.png"
                    alt="T-Shirt Mockup"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
                />

                {/* Color overlay using multiply blend - only for non-white colors */}
                {color !== '#FFFFFF' && (
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            backgroundColor: color,
                            mixBlendMode: 'multiply',
                            opacity: 0.8,
                            maskImage: 'url(/tshirt-cutout.png)',
                            WebkitMaskImage: 'url(/tshirt-cutout.png)',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center'
                        }}
                    />
                )}

                {/* Print Area Overlay - Positioned on chest/torso (Matched to 11.9" x 17.9" ratio) */}
                <div className="absolute top-[22%] left-[50%] -translate-x-[50%] w-[38%] h-[57%] z-20">
                    {children}
                </div>
            </div>
        </div>
    );
};


const TSHIRT_COLORS = [
    { name: 'White', value: '#FFFFFF', class: 'bg-white border-gray-200' },
    { name: 'Black', value: '#333333', class: 'bg-neutral-900 border-neutral-700' },
    { name: 'Navy', value: '#172554', class: 'bg-blue-950 border-blue-900' },
    { name: 'Heather', value: '#9CA3AF', class: 'bg-gray-400 border-gray-500' },
    { name: 'Red', value: '#DC2626', class: 'bg-red-600 border-red-700' },
];

export default function DesignStudio() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);

    // Manipulation State
    const [scale, setScale] = useState(100); // Percentage
    const [rotation, setRotation] = useState(0); // Degrees
    const [position, setPosition] = useState({ x: 50, y: 50 }); // percentages
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Mouse position on start
    const [initialMetrics, setInitialMetrics] = useState({ x: 0, y: 0, scale: 100, rotation: 0 }); // Snapshot for calculating deltas

    // Alignment Guides
    const [guides, setGuides] = useState({ x: false, y: false });

    const containerRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileError(null);
        if (!file) return;

        // File size validation (increased for high-res images)
        if (file.size > 25 * 1024 * 1024) { // 25MB for high-res files
            setFileError("File size too large (max 25MB)");
            return;
        }

        // File type validation - PNG preferred for transparency
        if (!['image/png', 'image/webp'].includes(file.type)) {
            setFileError("Please upload PNG or WebP with transparent background");
            return;
        }

        // Validate image dimensions for print quality
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Recommended: 3000x4000px minimum for 300 DPI print quality
            if (width < 2400 || height < 2400) {
                setFileError(`Low resolution: ${width}x${height}px. Recommended: 3000x4000px minimum for best print quality (300 DPI)`);
                // Still allow, but warn
            }

            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            // Reset transform on new file
            setScale(80);
            setRotation(0);
            setPosition({ x: 50, y: 50 });
        };

        img.onerror = () => {
            setFileError("Failed to load image. Please try another file.");
        };

        img.src = URL.createObjectURL(file);
    };

    const handleDelete = () => {
        setPreviewUrl(null);
        setFileError(null);
    };

    const handleMouseDown = (e: React.MouseEvent, type: 'move' | 'resize' | 'rotate') => {
        // Only trigger on left click
        if (e.button !== 0) return;

        e.preventDefault();
        e.stopPropagation();

        if (type === 'move') setIsDragging(true);
        else if (type === 'resize') setIsResizing(true);
        else if (type === 'rotate') setIsRotating(true);

        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialMetrics({ x: position.x, y: position.y, scale, rotation });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging && !isResizing && !isRotating) return;
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            if (isDragging) {
                // Calculate movement in percentage relative to container width/height
                const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
                const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

                let newX = initialMetrics.x + deltaX;
                let newY = initialMetrics.y + deltaY;

                // Basic clamping
                newX = Math.max(0, Math.min(100, newX));
                newY = Math.max(0, Math.min(100, newY));

                // Snapping Logic (Threshold 3%)
                const SNAP_THRESHOLD = 3;
                let snapX = false;
                let snapY = false;

                if (Math.abs(newX - 50) < SNAP_THRESHOLD) {
                    newX = 50;
                    snapX = true;
                }
                if (Math.abs(newY - 50) < SNAP_THRESHOLD) {
                    newY = 50;
                    snapY = true;
                }

                setGuides({ x: snapX, y: snapY });
                setPosition({ x: newX, y: newY });
            }

            if (isResizing) {
                const pxChange = (e.clientX - dragStart.x);
                const scaleDelta = pxChange * 0.5;
                const newScale = Math.max(20, Math.min(200, initialMetrics.scale + scaleDelta));
                setScale(newScale);
            }

            if (isRotating) {
                const imageCenterX = rect.left + (rect.width * (position.x / 100));
                const imageCenterY = rect.top + (rect.height * (position.y / 100));

                const angle = Math.atan2(e.clientY - imageCenterY, e.clientX - imageCenterX) * (180 / Math.PI);
                const startAngle = Math.atan2(dragStart.y - imageCenterY, dragStart.x - imageCenterX) * (180 / Math.PI);
                const angleDelta = angle - startAngle;

                let newRotation = (initialMetrics.rotation + angleDelta) % 360;
                if (newRotation < 0) newRotation += 360;
                setRotation(newRotation);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setIsRotating(false);
            setGuides({ x: false, y: false });
        };

        if (isDragging || isResizing || isRotating) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, isRotating, dragStart, initialMetrics, position]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        await new Promise(r => setTimeout(r, 1500));
        window.location.href = '/product/create';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12 container mx-auto px-4 max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Design Studio</h1>
                        <p className="text-muted-foreground">Create your next bestseller</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">

                    {/* Controls Sidebar */}
                    <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col overflow-hidden">

                        <div className="p-6 border-b bg-gray-50/50">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Palette className="w-5 h-5" /> Product Config
                            </h2>
                        </div>

                        <div className="p-6 space-y-8 overflow-y-auto flex-1">
                            {/* 1. Base Product & Colors */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base font-semibold">Product Color</Label>
                                    <p className="text-xs text-muted-foreground mb-3">Choose the base color for your preview.</p>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {TSHIRT_COLORS.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border shadow-sm transition-all relative group ${color.class} ${selectedColor.name === color.name ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-105'}`}
                                            title={color.name}
                                        >
                                            {selectedColor.name === color.name && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full shadow-sm ring-1 ring-black/10" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Sizing */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base font-semibold">Enabled Sizes</Label>
                                    <p className="text-xs text-muted-foreground mb-3">Select sizes you want to sell.</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                                        <div key={size} className="flex items-center space-x-2">
                                            <div className="h-9 w-12 rounded-md border flex items-center justify-center text-sm font-medium bg-gray-50 text-foreground cursor-default border-primary/20 bg-primary/5">
                                                {size}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-border/50" />

                            {/* 3. Design Info & Upload */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Title <span className="text-red-500">*</span></Label>
                                        <Input
                                            placeholder="Name of your design"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Description <span className="text-red-500">*</span></Label>
                                        <textarea
                                            placeholder="Tell the story behind your design"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            maxLength={250}
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                        />
                                        <p className="text-xs text-muted-foreground flex justify-between items-center px-1">
                                            <span className="flex items-center gap-1">
                                                <span className="inline-block border border-current rounded-full w-3 h-3 text-[10px] text-center leading-none">!</span>
                                                Limited to 250 Characters
                                            </span>
                                            <span className={description.length > 220 ? "text-orange-500 font-medium" : ""}>
                                                {description.length}/250
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Upload Design</Label>
                                    {previewUrl ? (
                                        <div className="border rounded-xl p-3 flex items-center gap-3 bg-gray-50/50 group hover:border-primary/30 transition-colors">
                                            <div className="h-14 w-14 bg-white border rounded-lg p-1 flex items-center justify-center shadow-sm">
                                                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">Uploaded_Image.png</p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <button onClick={handleDelete} className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                                                        <Trash2 className="w-3 h-3" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all">
                                                <Input
                                                    type="file"
                                                    accept="image/png, image/webp, image/jpeg"
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                                    <div className="p-3 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                                                        <Upload className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-foreground">Click to upload</span>
                                                        <p className="text-xs mt-1 text-muted-foreground">PNG, WebP up to 25MB (300 DPI recommended)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {fileError && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><X className="w-3 h-3" /> {fileError}</p>}
                                </div>
                            </div>

                            {/* 4. Design Specs Summary */}
                            <div className="space-y-3 pt-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Design Requirements</Label>
                                <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5" />
                                        <p className="text-xs text-blue-800 leading-relaxed italic">Print Area: <span className="font-semibold">11.9″ × 17.9″</span></p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5" />
                                        <p className="text-xs text-blue-800 leading-relaxed italic">Resolution: <span className="font-semibold">300 DPI minimum</span></p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5" />
                                        <p className="text-xs text-blue-800 leading-relaxed italic">Dimensions: <span className="font-semibold">3000 × 4000 px recommended</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Cost Estimate */}
                        <div className="p-6 border-t bg-gray-50/50 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Base Cost:</span>
                                <span className="font-semibold text-foreground">$12.50 / unit</span>
                            </div>
                            <Button className="w-full shadow-lg shadow-primary/20" size="lg" disabled={!previewUrl || !title || isUploading} onClick={handleSubmit}>
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {isUploading ? 'Creating...' : 'Continue to Pricing'}
                            </Button>
                        </div>
                    </div>

                    {/* Mockup Preview */}
                    <div className="lg:col-span-2 bg-white rounded-xl border flex items-center justify-center p-8 relative overflow-hidden">

                        <div className="relative w-full max-w-[600px] aspect-[4/5] z-10 transition-all duration-500 ease-in-out">
                            <TshirtMockup color={selectedColor.value}>
                                <div
                                    ref={containerRef}
                                    className="relative w-full h-full border-2 border-dashed border-red-300/70 rounded-none group"
                                >
                                    {/* Info Icon Matching Reference */}
                                    <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center z-50 pointer-events-none shadow-sm">
                                        <span className="font-serif italic font-bold text-[10px] text-slate-500">i</span>
                                    </div>

                                    {/* Alignment Guides - Full width/height lines */}
                                    {guides.x && (
                                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-[1px] bg-sky-400 z-50 pointer-events-none" />
                                    )}
                                    {guides.y && (
                                        <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-[1px] bg-sky-400 z-50 pointer-events-none" />
                                    )}

                                    {previewUrl ? (
                                        <div
                                            className="absolute cursor-move origin-center"
                                            style={{
                                                left: `${position.x}%`,
                                                top: `${position.y}%`,
                                                width: `${scale}%`,
                                                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                            }}
                                            onMouseDown={(e) => handleMouseDown(e, 'move')}
                                        >
                                            <div className={`relative group/design ${isDragging ? 'opacity-90' : ''}`}>

                                                {/* Selection Box */}
                                                <div className="absolute -inset-2 border border-sky-400/0 group-hover/design:border-sky-400/50 transition-colors pointer-events-none rounded-sm" />

                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-auto pointer-events-none select-none drop-shadow-sm"
                                                    draggable={false}
                                                />

                                                {/* ---- Controls Overlay (Visible on Hover/Active) ---- */}
                                                <div className="opacity-0 group-hover/design:opacity-100 transition-opacity">

                                                    {/* Top Controls: Delete & Rotate */}
                                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-900/90 p-1.5 rounded-full shadow-2xl backdrop-blur-md border border-white/20">
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                        </button>
                                                        <div className="w-[1px] h-4 bg-white/20" />
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-grab active:cursor-grabbing"
                                                            onMouseDown={(e) => handleMouseDown(e, 'rotate')}
                                                            title="Rotate"
                                                        >
                                                            <RotateCw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                                            onClick={(e) => { e.stopPropagation(); setPosition({ x: 50, y: 50 }); setRotation(0); }}
                                                            title="Center Design"
                                                        >
                                                            <Move className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Bottom Right: Scale */}
                                                    <div
                                                        className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 shadow-lg cursor-nwse-resize z-40"
                                                        onMouseDown={(e) => handleMouseDown(e, 'resize')}
                                                    >
                                                        <Scaling className="w-4 h-4" />
                                                    </div>

                                                    {/* Dimensions Tooltip */}
                                                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none border border-white/10 flex items-center gap-2">
                                                        <span>{Math.round(scale * 0.12)}" x {Math.round(scale * 0.12 * 1.5)}"</span>
                                                        <span className="text-gray-500">|</span>
                                                        <span className={scale > 110 ? "text-yellow-400" : "text-green-400"}>
                                                            Print Quality: {scale > 120 ? 'Good' : 'Great'}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </TshirtMockup>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
