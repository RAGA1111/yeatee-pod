'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { selectBestVendor } from '@/lib/core'

/**
 * ACTION: Upload a design file.
 * Simulates a real upload by saving to public/uploads.
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * ACTION: Upload a design file.
 * Simulates a real upload by saving to public/uploads.
 */
export async function uploadDesign(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        throw new Error("Unauthorized");
    }

    const file = formData.get('image') as File
    const name = formData.get('name') as string || "Untitled"

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) throw new Error("User not found")

    if (!file || file.size === 0) {
        throw new Error("No file provided")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    // Sanitize filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    try {
        await mkdir(uploadDir, { recursive: true })
        await writeFile(path.join(uploadDir, filename), buffer)
    } catch (error) {
        console.error("Upload failed", error)
        throw new Error("Failed to save file to disk")
    }

    // Create Design Record
    await prisma.design.create({
        data: {
            userId: user.id,
            imageUrl: `/uploads/${filename}`
        }
    })

    // Redirect to Product Creation
    redirect('/product/create')
}

/**
 * ACTION: Create a fixed-configuration product.
 * Links a design to a specific T-Shirt configuration.
 */
export async function createProduct(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        throw new Error("Unauthorized");
    }

    const designId = formData.get('designId') as string
    const color = formData.get('color') as string // e.g. "White"
    const size = formData.get('size') as string   // e.g. "L"
    const price = parseFloat(formData.get('price') as string)
    const title = formData.get('title') as string

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) throw new Error("User not found")

    await prisma.product.create({
        data: {
            title,
            designId,
            creatorId: user.id,
            color,
            size,
            price
        }
    })

    redirect('/shop')
}

/**
 * ACTION: Place an order.
 * Triggers the Vendor Selection Logic and records financial breakdown.
 */
export async function placeOrder(productId: string) {
    const session = await getServerSession(authOptions);
    console.log("Session in placeOrder:", session); // DEBUG

    // For now, allow unauthenticated orders (optional) or enforce:
    // if (!session || !session.user) throw new Error("Must be logged in to order");

    // Fallback provided for guest checkout logic if needed, but for now let's try to capture logged in user:
    let user = null;
    if (session && session.user && session.user.email) {
        user = await prisma.user.findUnique({ where: { email: session.user.email } });
    }

    // If no user/guest, fallback to Bob for demo or fail
    if (!user) {
        user = await prisma.user.findFirst({ where: { email: "bob@example.com" } });
        if (!user) throw new Error("User not found (and fallback Bob missing)");
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) throw new Error("Product not found")

    // 1. Fundamentals: Select Best Vendor
    // Logic: Lowest (Base + Print)
    const vendors = await prisma.vendor.findMany() // Fetch all potential vendors
    const bestVendor = selectBestVendor(vendors)

    if (!bestVendor) throw new Error("No vendors available to fulfill this order.")

    // 2. Fundamentals: Explicit Cost Breakdown
    const baseCost = bestVendor.baseCost
    const printCost = bestVendor.printCost
    const totalCost = baseCost + printCost
    const platformFee = product.price - totalCost // Profit

    // 3. Create Order Record
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            productId: product.id,
            vendorId: bestVendor.id,
            quantity: 1,
            baseCost,
            printCost,
            platformFee,
            totalCost,
            finalPrice: product.price,
            status: "PLACED"
        }
    })

    redirect(`/orders/${order.id}`)
}
