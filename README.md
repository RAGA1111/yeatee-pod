# 👕 Yeatee Studio: Wear Your Vibe. Create Your Brand.

Yeatee Studio is a premium, high-fidelity **Print-on-Demand (POD)** platform designed for creators who want to launch their brand in seconds. No inventory, no hassle—just pure creativity.

---

## 🎨 Discover Yeatee Studio

### 🚀 Modern Landing Experience
![Yeatee Studio Landing Page](/public/screenshots/landing%20page.png)
Our landing page is designed to wow creators and customers alike, featuring a sleek, minimal interface that prioritizes your brand's "vibe."
- **Dual-Mode Navigation**: Seamlessly toggle between **Customer Mode** and **Creator Mode**.
- **Instant Onboarding**: Direct paths to "Shop Finds" or "Start Selling."

### 🖌️ Interactive Design Studio
![Yeatee Design Studio Editor](/public/screenshots/design%20page.png)
The heart of Yeatee Studio is our pro-grade mockup generator.
- **Realistic Mockups**: Drag, scale, and rotate your designs on high-quality fabric templates.
- **Dynamic Configuration**: Choose from a variety of base colors (White, Black, Navy, Gray, Red) and manage size availability (S to 3XL).
- **Transparent Pricing**: See your base costs ($12.50/unit) in real-time as you build your product.

---

## 🤖 Advanced Features

### 🏦 Agent-Driven Decision Engine
Behind the scenes, Yeatee Studio uses a deterministic logic engine to maximize creator profits.
- **Automated Fulfillment**: The system automatically routes orders to the most cost-effective vendor and printer.
- **Profit Tracking**: Transparent cost breakdowns ensure you know exactly what you're earning on every sale.

### 🛡️ Enterprise-Grade Security
- **Secure Authentication**: Powerded by NextAuth.js with strict route protection.
- **Role-Gated Access**: Separate dashboards for managing listings (Creator) and tracking orders (Customer).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **UI Architecture**: Radix UI & Shadcn/UI
- **Database**: PostgreSQL (Neon DB) via Prisma ORM
- **Auth**: NextAuth.js

---

## 🏃 Getting Started

### 1. Installation
```bash
git clone <your-repo-url>
cd pod-app
npm install
```

### 2. Configuration
Create a `.env` file with your database and auth credentials:
```env
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Locally
```bash
npm run dev
```

---

## 📐 Print Specifications
- **Recommended Format**: PNG (300 DPI)
- **Dimensions**: ~3000 x 4000 pixels
- **Area**: Standard adult print area (11.9″ × 17.9″)

---

## 📄 License
Yeatee Studio is built for high-fidelity prototyping and demonstration. 
All rights reserved.
