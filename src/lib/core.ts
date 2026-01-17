import { Vendor } from "@prisma/client";

/**
 * Calculates the total cost for a vendor to produce the item.
 * Explicit logic: Base Cost + Print Cost.
 */
export function calculateVendorCost(vendor: Vendor): number {
    return vendor.baseCost + vendor.printCost;
}

/**
 * Selects the best vendor based on the lowest total cost.
 * This is deterministic and simple.
 */
export function selectBestVendor(vendors: Vendor[]): Vendor | null {
    if (!vendors.length) return null;

    // Sort by cost ascending
    const sorted = [...vendors].sort((a, b) => {
        return calculateVendorCost(a) - calculateVendorCost(b);
    });

    return sorted[0];
}

/**
 * Breakdown of the costs and profit for a single order.
 * Used to show transparency to the user.
 */
export function calculateProfitBreakdown(sellingPrice: number, vendor: Vendor) {
    const cost = calculateVendorCost(vendor);
    const profit = sellingPrice - cost;

    return {
        baseCost: vendor.baseCost,
        printCost: vendor.printCost,
        totalCost: cost,
        profit: profit,
        grossMargin: (profit / sellingPrice) * 100
    };
}
