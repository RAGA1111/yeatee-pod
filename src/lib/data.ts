export interface Product {
  id: string;
  title: string;
  designImage: string;
  colors: ("WHITE" | "BLACK" | "GRAY" | "NAVY" | "RED")[];
  sellingPrice: number;
  creatorId: string;
  tshirtType: "BASIC" | "PREMIUM";
  isActive: boolean;
  rating?: number;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
  creator: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CREATOR" | "CUSTOMER";
  image?: string;
  bio?: string;
  brand?: Brand;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  banner?: string;
  description?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  color: "WHITE" | "BLACK" | "GRAY" | "NAVY" | "RED";
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Order {
  id: string;
  customerId: string;
  items: {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size?: string;
    color: string;
  }[];
  totalAmount: number;
  creatorProfit: number;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  printerStatus?: string;
  vendorStatus?: string;
}

export interface Vendor {
  id: string;
  name: string;
  status: "active" | "busy" | "offline";
  fulfillmentTime: number; // Hours
  regions: string[];
}

export interface Printer {
  id: string;
  name: string;
  status: "idle" | "printing" | "maintenance";
  capacity: number;
  currentOrders: number;
}

export interface ProfitMetrics {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitMargin: number;
  ordersCount: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    title: string;
    profit: number;
  }>;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Urban Explorer Tee",
    designImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    colors: ["WHITE", "BLACK", "NAVY"],
    sellingPrice: 24.99,
    creatorId: "creator1",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator1",
      name: "Alex Designer",
      email: "alex@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      bio: "Graphic designer specializing in minimalist art",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "2",
    title: "Clean Lines Tee",
    designImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    colors: ["WHITE", "BLACK", "GRAY"],
    sellingPrice: 22.99,
    creatorId: "creator1",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator1",
      name: "Alex Designer",
      email: "alex@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      bio: "Graphic designer specializing in minimalist art",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "3",
    title: "Retro Gaming Tee",
    designImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    colors: ["BLACK", "WHITE"],
    sellingPrice: 28.99,
    creatorId: "creator1",
    tshirtType: "PREMIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator1",
      name: "Alex Designer",
      email: "alex@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      bio: "Graphic designer specializing in minimalist art",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "4",
    title: "Mountain Peak Design",
    designImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    colors: ["WHITE", "GRAY"],
    sellingPrice: 26.99,
    creatorId: "creator2",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator2",
      name: "Sarah Artist",
      email: "sarah@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      bio: "Digital artist creating unique illustrations",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "5",
    title: "Floral Dream Tee",
    designImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
    colors: ["WHITE", "RED"],
    sellingPrice: 23.99,
    creatorId: "creator2",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator2",
      name: "Sarah Artist",
      email: "sarah@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      bio: "Digital artist creating unique illustrations",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "6",
    title: "Single Stroke Art",
    designImage: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80",
    colors: ["WHITE", "NAVY", "BLACK"],
    sellingPrice: 25.99,
    creatorId: "creator2",
    tshirtType: "PREMIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator2",
      name: "Sarah Artist",
      email: "sarah@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      bio: "Digital artist creating unique illustrations",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "7",
    title: "Abstract Waves",
    designImage: "https://images.unsplash.com/photo-1518049362265-d5c2a64a07a0?w=800&q=80",
    colors: ["WHITE", "NAVY"],
    sellingPrice: 27.99,
    creatorId: "creator3",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator3",
      name: "Mike Creative",
      email: "mike@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Streetwear designer with urban influences",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "8",
    title: "Street Art Explosion",
    designImage: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
    colors: ["BLACK", "WHITE", "RED"],
    sellingPrice: 29.99,
    creatorId: "creator3",
    tshirtType: "PREMIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator3",
      name: "Mike Creative",
      email: "mike@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Streetwear designer with urban influences",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  },
  {
    id: "9",
    title: "Superhero Kid Tee",
    designImage: "https://images.unsplash.com/photo-1519325056708-30de68d37452?w=800&q=80",
    colors: ["NAVY", "RED"],
    sellingPrice: 19.99,
    creatorId: "creator3",
    tshirtType: "BASIC",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    creator: {
      id: "creator3",
      name: "Mike Creative",
      email: "mike@example.com",
      role: "CREATOR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Streetwear designer with urban influences",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    }
  }
];

export const categories = [
  {
    id: "graphic-tees",
    name: "Graphic Tees",
    slug: "graphic-tees",
    description: "Bold graphic designs and artwork",
    image: "/categories/graphic.jpg"
  },
  {
    id: "minimal-tees",
    name: "Minimal Tees",
    slug: "minimal-tees",
    description: "Clean, minimalist designs",
    image: "/categories/minimal.jpg"
  },
  {
    id: "nature-tees",
    name: "Nature Tees",
    slug: "nature-tees",
    description: "Nature-inspired artwork",
    image: "/categories/nature.jpg"
  },
  {
    id: "pop-culture",
    name: "Pop Culture",
    slug: "pop-culture",
    description: "Pop culture and retro designs",
    image: "/categories/pop.jpg"
  }
];

// Mock Vendors
export const vendors: Vendor[] = [
  {
    id: "vendor1",
    name: "Printful",
    status: "active",
    fulfillmentTime: 3,
    regions: ["US", "EU", "Asia"],
  },
  {
    id: "vendor2",
    name: "Printify",
    status: "busy",
    fulfillmentTime: 5,
    regions: ["US", "EU"],
  },
  {
    id: "vendor3",
    name: "Teespring",
    status: "active",
    fulfillmentTime: 2,
    regions: ["US", "EU", "Asia", "AU"],
  },
];

// Mock Orders
export const orders: Order[] = [
  {
    id: "order1",
    customerId: "customer1",
    items: [
      {
        id: "item1",
        productId: "1",
        product: products[0],
        quantity: 2,
        size: "M",
        color: "white",
      },
    ],
    totalAmount: 2598,
    creatorProfit: 1098,
    status: "delivered",
    createdAt: "2024-01-15T10:00:00Z",
    printerStatus: "completed",
    vendorStatus: "fulfilled",
  },
  {
    id: "order2",
    customerId: "customer2",
    items: [
      {
        id: "item2",
        productId: "3",
        product: products[2],
        quantity: 1,
        size: "L",
        color: "black",
      },
      {
        id: "item3",
        productId: "7",
        product: products[6],
        quantity: 1,
        size: "XL",
        color: "white",
      },
    ],
    totalAmount: 3898,
    creatorProfit: 1849,
    status: "processing",
    createdAt: "2024-01-20T14:30:00Z",
    printerStatus: "printing",
    vendorStatus: "pending",
  },
];

// Utility functions for profit calculations (removed - using mock data in orders instead)