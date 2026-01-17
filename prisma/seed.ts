import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.design.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const creator = await prisma.user.create({
    data: {
      name: "Alice Creator",
      email: "alice@example.com",
      password: "hashed_dummy_password",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Bob Buyer",
      email: "bob@example.com",
      password: "hashed_dummy_password",
    },
  });

  // Create Vendors (Simple logic: Base + Print)
  await prisma.vendor.createMany({
    data: [
      { name: "Budget Prints", baseCost: 5.00, printCost: 3.00 }, // Total: 8
      { name: "Premium Wear", baseCost: 10.00, printCost: 5.00 }, // Total: 15
      { name: "Fast & Decent", baseCost: 6.00, printCost: 3.50 }, // Total: 9.5
    ]
  });

  console.log("Seeding complete with simple Fundamental data.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
