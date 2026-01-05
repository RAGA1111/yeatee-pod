import { PrismaClient, UserRole, TShirtType, TShirtColor, OrderStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create users (creators and customers)
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    // Creators
    prisma.user.create({
      data: {
        name: "Alex Designer",
        email: "alex@example.com",
        password: hashedPassword,
        role: UserRole.CREATOR,
        bio: "Graphic designer specializing in minimalist art"
      }
    }),
    prisma.user.create({
      data: {
        name: "Sarah Artist",
        email: "sarah@example.com",
        password: hashedPassword,
        role: UserRole.CREATOR,
        bio: "Digital artist creating unique illustrations"
      }
    }),
    prisma.user.create({
      data: {
        name: "Mike Creative",
        email: "mike@example.com",
        password: hashedPassword,
        role: UserRole.CREATOR,
        bio: "Streetwear designer with urban influences"
      }
    }),
    prisma.user.create({
      data: {
        name: "Emma Illustrator",
        email: "emma@example.com",
        password: hashedPassword,
        role: UserRole.CREATOR,
        bio: "Illustrator focusing on nature and animals"
      }
    }),
    prisma.user.create({
      data: {
        name: "Tom Graphic",
        email: "tom@example.com",
        password: hashedPassword,
        role: UserRole.CREATOR,
        bio: "Graphic designer with pop culture themes"
      }
    }),
    // Customers
    prisma.user.create({
      data: {
        name: "John Customer",
        email: "john@example.com",
        password: hashedPassword,
        role: UserRole.CUSTOMER
      }
    }),
    prisma.user.create({
      data: {
        name: "Jane Shopper",
        email: "jane@example.com",
        password: hashedPassword,
        role: UserRole.CUSTOMER
      }
    }),
    prisma.user.create({
      data: {
        name: "Bob Buyer",
        email: "bob@example.com",
        password: hashedPassword,
        role: UserRole.CUSTOMER
      }
    })
  ]);

  console.log("Users created:", users.length);

  // Create brands for creators
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: "Alex Designs",
        banner: "/brands/alex-banner.jpg",
        description: "Minimalist art for everyday wear",
        creatorId: users[0].id
      }
    }),
    prisma.brand.create({
      data: {
        name: "Sarah's Art",
        banner: "/brands/sarah-banner.jpg",
        description: "Unique digital illustrations",
        creatorId: users[1].id
      }
    }),
    prisma.brand.create({
      data: {
        name: "Mike Street",
        banner: "/brands/mike-banner.jpg",
        description: "Urban streetwear designs",
        creatorId: users[2].id
      }
    }),
    prisma.brand.create({
      data: {
        name: "Emma Nature",
        banner: "/brands/emma-banner.jpg",
        description: "Nature-inspired artwork",
        creatorId: users[3].id
      }
    }),
    prisma.brand.create({
      data: {
        name: "Tom Pop",
        banner: "/brands/tom-banner.jpg",
        description: "Pop culture graphic designs",
        creatorId: users[4].id
      }
    })
  ]);

  console.log("Brands created:", brands.length);

  // Create vendors
  const vendors = await Promise.all([
    prisma.vendor.create({
      data: {
        name: "Basic Tee Co",
        tshirtType: TShirtType.BASIC,
        availableColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.GRAY],
        baseCost: 5.0,
        dailyCapacity: 1000
      }
    }),
    prisma.vendor.create({
      data: {
        name: "Premium Fabric Ltd",
        tshirtType: TShirtType.PREMIUM,
        availableColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.NAVY, TShirtColor.RED],
        baseCost: 8.0,
        dailyCapacity: 500
      }
    }),
    prisma.vendor.create({
      data: {
        name: "Color Tee Supply",
        tshirtType: TShirtType.BASIC,
        availableColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.GRAY, TShirtColor.NAVY, TShirtColor.RED],
        baseCost: 6.0,
        dailyCapacity: 800
      }
    }),
    prisma.vendor.create({
      data: {
        name: "Elite Premium Tees",
        tshirtType: TShirtType.PREMIUM,
        availableColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.NAVY],
        baseCost: 9.0,
        dailyCapacity: 300
      }
    })
  ]);

  console.log("Vendors created:", vendors.length);

  // Create printers
  const printers = await Promise.all([
    prisma.printer.create({
      data: {
        name: "Fast Print Pro",
        costPerPrint: 3.0,
        maxDailyPrints: 2000,
        supportedColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.GRAY, TShirtColor.NAVY, TShirtColor.RED],
        reliabilityScore: 0.95
      }
    }),
    prisma.printer.create({
      data: {
        name: "Quality Print Hub",
        costPerPrint: 4.0,
        maxDailyPrints: 1500,
        supportedColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.NAVY, TShirtColor.RED],
        reliabilityScore: 0.98
      }
    }),
    prisma.printer.create({
      data: {
        name: "Bulk Print Services",
        costPerPrint: 2.5,
        maxDailyPrints: 3000,
        supportedColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.GRAY],
        reliabilityScore: 0.90
      }
    }),
    prisma.printer.create({
      data: {
        name: "Premium Print Co",
        costPerPrint: 5.0,
        maxDailyPrints: 1000,
        supportedColors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.NAVY, TShirtColor.RED],
        reliabilityScore: 0.99
      }
    })
  ]);

  console.log("Printers created:", printers.length);

  // Create products
  const products = await Promise.all([
    // Alex's products
    prisma.product.create({
      data: {
        title: "Urban Explorer Tee",
        designImage: "/designs/urban-explorer.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.NAVY],
        sellingPrice: 24.99,
        creatorId: users[0].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Clean Lines Tee",
        designImage: "/designs/clean-lines.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.BLACK, TShirtColor.GRAY],
        sellingPrice: 22.99,
        creatorId: users[0].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Retro Gaming Tee",
        designImage: "/designs/retro-gaming.jpg",
        colors: [TShirtColor.BLACK, TShirtColor.WHITE],
        sellingPrice: 28.99,
        creatorId: users[0].id,
        tshirtType: TShirtType.PREMIUM
      }
    }),
    // Sarah's products
    prisma.product.create({
      data: {
        title: "Mountain Peak Design",
        designImage: "/designs/mountain-peak.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.GRAY],
        sellingPrice: 26.99,
        creatorId: users[1].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Floral Dream Tee",
        designImage: "/designs/floral-dream.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.RED],
        sellingPrice: 23.99,
        creatorId: users[1].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Single Stroke Art",
        designImage: "/designs/single-stroke.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.NAVY, TShirtColor.BLACK],
        sellingPrice: 25.99,
        creatorId: users[1].id,
        tshirtType: TShirtType.PREMIUM
      }
    }),
    // Mike's products
    prisma.product.create({
      data: {
        title: "Abstract Waves",
        designImage: "/designs/abstract-waves.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.NAVY],
        sellingPrice: 27.99,
        creatorId: users[2].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Street Art Explosion",
        designImage: "/designs/street-art.jpg",
        colors: [TShirtColor.BLACK, TShirtColor.WHITE, TShirtColor.RED],
        sellingPrice: 29.99,
        creatorId: users[2].id,
        tshirtType: TShirtType.PREMIUM
      }
    }),
    prisma.product.create({
      data: {
        title: "Superhero Kid Tee",
        designImage: "/designs/superhero-kid.jpg",
        colors: [TShirtColor.NAVY, TShirtColor.RED],
        sellingPrice: 19.99,
        creatorId: users[2].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    // Emma's products
    prisma.product.create({
      data: {
        title: "Forest Whisper",
        designImage: "/designs/forest-whisper.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.GRAY],
        sellingPrice: 24.99,
        creatorId: users[3].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "Ocean Breeze",
        designImage: "/designs/ocean-breeze.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.NAVY],
        sellingPrice: 26.99,
        creatorId: users[3].id,
        tshirtType: TShirtType.PREMIUM
      }
    }),
    prisma.product.create({
      data: {
        title: "Mountain Sunset",
        designImage: "/designs/mountain-sunset.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.NAVY],
        sellingPrice: 27.99,
        creatorId: users[3].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    // Tom's products
    prisma.product.create({
      data: {
        title: "Pixel Hero",
        designImage: "/designs/pixel-hero.jpg",
        colors: [TShirtColor.BLACK, TShirtColor.WHITE],
        sellingPrice: 25.99,
        creatorId: users[4].id,
        tshirtType: TShirtType.BASIC
      }
    }),
    prisma.product.create({
      data: {
        title: "80s Retro",
        designImage: "/designs/80s-retro.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.RED],
        sellingPrice: 28.99,
        creatorId: users[4].id,
        tshirtType: TShirtType.PREMIUM
      }
    }),
    prisma.product.create({
      data: {
        title: "Comic Strip",
        designImage: "/designs/comic-strip.jpg",
        colors: [TShirtColor.WHITE, TShirtColor.BLACK],
        sellingPrice: 23.99,
        creatorId: users[4].id,
        tshirtType: TShirtType.BASIC
      }
    })
  ]);

  console.log("Products created:", products.length);

  // Create orders
  const orders = [];
  for (let i = 0; i < 30; i++) {
    const customerIndex = 5 + (i % 3); // John, Jane, Bob
    const productIndex = i % products.length;
    const quantity = Math.floor(Math.random() * 5) + 1;
    const product = products[productIndex];
    const totalCost = product.sellingPrice * quantity;

    const order = await prisma.order.create({
      data: {
        userId: users[customerIndex].id,
        productId: product.id,
        quantity,
        totalCost,
        status: i % 4 === 0 ? OrderStatus.PLACED : i % 4 === 1 ? OrderStatus.PRINTING : i % 4 === 2 ? OrderStatus.SHIPPED : OrderStatus.DELIVERED
      }
    });
    orders.push(order);
  }

  console.log("Orders created:", orders.length);

  console.log("Seeding complete!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
