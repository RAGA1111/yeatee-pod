# 👕 Yeatee Pod: High-Fidelity Creator Platform<!-- YOLO Achievement Quest -->

Yeatee Pod is a modern, transparent, and agent-driven **Print-on-Demand (POD)** ecosystem. It bridges the gap between creator inspiration and customer delivery through a sophisticated Design Studio and a deterministic decision engine.

---

## 🚀 Key Features

### 🎨 Professional Design Studio
A high-fidelity mockup generator designed for pro-creators.
- **Realistic Mockups**: Uses advanced CSS masking and multiply-blend techniques on transparent base images to simulate realistic fabric coloring and texture.
- **Interactive Tools**: Full manipulate-on-canvass support—drag, rotate, and scale—with a sleek, floating glassmorphism toolbar.
- **Print Quality Guard**: Real-time resolution validation (300 DPI target) and dimension tooltips to ensure designs meet professional standards (3000x4000px minimum recommended).
- **Chest-Torso Alignment**: Smart printable area constraints matched to standard adult sizing (11.9″ × 17.9″).

### 🤖 Agent-Driven Decision Engine
Transparent vendor selection logic that prioritizes profit and reliability.
- **Deterministic Logic**: Automatically selects the best vendor based on `(Base Cost + Print Cost)`.
- **Decision Logs**: Customers and creators can see *exactly why* a specific printer was chosen (e.g., "Cost Efficiency", "High Reliability").
- **Cost Transparency**: Every order records the exact cost breakdown at the minute of purchase.

### 🔄 Role-Based Experience
Seamlessly switch between two distinct perspectives in a single app.
- **Customer Marketplace**: Browse products, manage cart, and track orders.
- **Creator Dashboard**: Manage listings, view profit metrics, and launch new products via the Design Studio.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Actions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Database**: [SQLite](https://sqlite.org/) (Local) via [Prisma ORM](https://www.prisma.io/)
- **UI Components**: Built with [Radix UI](https://www.radix-ui.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Logic**: Custom Decision Engine for vendor fulfillment.

---

## 🏃 Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd pod-app

# Install dependencies
npm install
```

### 3. Database Setup (Prisma)
```bash
# Push the schema to local SQLite
npx prisma db push

# (Optional) Seed the database with sample products and vendors
npx prisma db seed
```

### 4. Launch Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to start creating.

---

## 📐 Print Specifications
To maintain highest print quality, we recommend following these standards:
- **Format**: PNG or WebP with transparent background.
- **PPI/DPI**: 300 DPI minimum.
- **Dimensions**: ~3000 x 4000 pixels.
- **Max File Size**: 25MB.

---

## 📁 Architecture
- `src/app/design/upload`: The core Design Studio logic and interactive canvas.
- `src/lib/decisionEngine.ts`: The "brain" behind vendor selection and logistics.
- `src/contexts/`: Manages global state for User Role (Creator/Customer) and Cart.
- `prisma/schema.prisma`: Defines the transparent data model for Orders, Products, and Vendors.

---

## 📄 License
Yeatee Pod is built for demonstration and high-fidelity prototyping. All rights reserved.
