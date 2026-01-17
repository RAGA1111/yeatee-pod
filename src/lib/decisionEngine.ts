import { Vendor, Printer } from "./data";

export interface DecisionInput {
    tshirtType: "BASIC" | "PREMIUM";
    color: string;
    quantity: number;
    creatorProfitGoal: number;
}

export interface DecisionResult {
    selectedVendor: Vendor;
    selectedPrinter: Printer;
    score: number;
    explanation: string;
    breakdown: {
        vendorScore: number;
        printerScore: number;
        profitScore: number;
    };
}

// Extended Mock Data for Decision Engine
export const VENDORS: Vendor[] = [
    { id: "v1", name: "PrintFul", status: "active", fulfillmentTime: 24, regions: ["US"] },
    { id: "v2", name: "PrintIFY", status: "active", fulfillmentTime: 48, regions: ["US", "EU"] },
    { id: "v3", name: "Gelato", status: "busy", fulfillmentTime: 72, regions: ["Global"] },
];

export const PRINTERS: Printer[] = [
    { id: "p1", name: "Kornit Atlas", status: "idle", capacity: 100, currentOrders: 10 },
    { id: "p2", name: "Brother GTX", status: "printing", capacity: 50, currentOrders: 45 },
    { id: "p3", name: "Aeoon Kymos", status: "maintenance", capacity: 200, currentOrders: 0 },
];

export const WEIGHTS = {
    PROFIT: 0.4,
    RELIABILITY: 0.3,
    AVAILABILITY: 0.3,
};

export function runDecisionEngine(input: DecisionInput): DecisionResult {
    // Mock reliability scores map
    const reliability: Record<string, number> = {
        "v1": 0.9,
        "v2": 0.8,
        "v3": 0.95,
    };

    let bestScore = -1;
    let bestVendor = VENDORS[0];
    let bestPrinter = PRINTERS[0];
    let explanations: string[] = [];
    let bestBreakdown = { vendorScore: 0, printerScore: 0, profitScore: 0 };

    // Finding the perfect match
    VENDORS.forEach(vendor => {
        if (vendor.status === 'offline') return;

        PRINTERS.forEach(printer => {
            if (printer.status === 'maintenance') return;

            // Calculate Scores

            // 1. Profit Score (Lower cost = higher profit potential)
            // Mock cost variance: Vendor 1 is expensive but fast. Vendor 2 is cheap.
            const baseCost = vendor.id === 'v1' ? 10 : 8;
            const profitPotential = input.creatorProfitGoal - baseCost; // highly simplified
            const profitScore = Math.max(0, Math.min(1, profitPotential / 20)); // Normalize 0-1

            // 2. Reliability Score
            const reliabilityScore = reliability[vendor.id] || 0.5;

            // 3. Availability Score (Printer capacity)
            const availabilityScore = (printer.capacity - printer.currentOrders) / printer.capacity;

            // Weighted Total
            const totalScore =
                (WEIGHTS.PROFIT * profitScore) +
                (WEIGHTS.RELIABILITY * reliabilityScore) +
                (WEIGHTS.AVAILABILITY * availabilityScore);

            if (totalScore > bestScore) {
                bestScore = totalScore;
                bestVendor = vendor;
                bestPrinter = printer;
                bestBreakdown = {
                    profitScore,
                    vendorScore: reliabilityScore,
                    printerScore: availabilityScore
                };

                // Generate Explanation
                const reasons = [];
                if (profitScore > 0.7) reasons.push(`Cost efficiency (${baseCost} base cost)`);
                if (reliabilityScore > 0.8) reasons.push(`High vendor reliability (${reliability[vendor.id] * 100}%)`);
                if (availabilityScore > 0.8) reasons.push(`Printer ${printer.name} has high capacity`);

                explanations = reasons;
            }
        });
    });

    return {
        selectedVendor: bestVendor,
        selectedPrinter: bestPrinter,
        score: bestScore,
        explanation: `Selected ${bestVendor.name} and ${bestPrinter.name} because: ${explanations.join(", ")}.`,
        breakdown: bestBreakdown
    };
}
