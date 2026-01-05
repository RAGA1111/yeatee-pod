#  Yeatee POD - Print-on-Demand T-Shirt Marketplace

A comprehensive print-on-demand (POD) t-shirt marketplace built with Next.js 16, featuring role-based UI, creator dashboards, design studio, and automated vendor/printer selection.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.0-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

##  Features

###  **Role-Based Experience**
- **Creator Mode**: Showcase brand store, manage products, access analytics
- **Customer Mode**: Browse marketplace, shop products, manage orders
- Seamless role switching with persistent state

###  **Design Studio**
- Interactive t-shirt preview with color variants
- Drag-and-drop design positioning and scaling
- Real-time profit calculator with cost breakdown
- Automated vendor/printer selection engine

###  **Creator Dashboard**
- Sales analytics and revenue metrics
- Product performance tracking
- Order management with status updates
- Profit margin calculations

###  **E-Commerce Features**
- Product catalog with filtering and search
- Shopping cart with quantity management
- Secure checkout flow
- Order history and tracking

###  **Smart Automation**
- Automated vendor/printer selection based on:
  - Profit optimization
  - Reliability scores
  - Capacity availability
  - Geographic regions

##  Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: React Context
- **Authentication**: Custom API-based (bcrypt)
- **Deployment**: Vercel/Netlify ready

##  Project Structure

```
pod-app/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts               # Mock data seeding
│   └── migrations/           # Database migrations
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── (pages)/          # Route groups
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI components (Radix)
│   │   └── Navbar.tsx        # Navigation component
│   ├── contexts/             # React contexts
│   │   ├── UserContext.tsx   # User state management
│   │   └── CartContext.tsx   # Shopping cart state
│   └── lib/                  # Utilities and configs
│       ├── prisma.ts         # Database client
│       ├── data.ts           # Mock data & interfaces
│       └── utils.ts          # Helper functions
├── public/                   # Static assets
└── .github/                  # GitHub configurations
```

##  Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RAGA1111/yeatee-pod.git
   cd yeatee-pod
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/yeatee_pod"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # Seed with mock data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

##  Database Schema

### Core Models

- **User**: Creators and customers with role-based access
- **Brand**: Creator brand information and store settings
- **Product**: T-shirt designs with pricing and metadata
- **Order**: Purchase orders with fulfillment tracking
- **Vendor**: Print-on-demand service providers
- **Printer**: Printing facility management

### Key Relationships

```
User (1) ──── (N) Brand
User (1) ──── (N) Product
User (1) ──── (N) Order
Product (N) ──── (1) Order
Vendor (N) ──── (1) Order
Printer (N) ──── (1) Order
```

##  Usage

### For Creators

1. **Switch to Creator Mode** using the navbar toggle
2. **View Your Brand Store** on the homepage
3. **Access Dashboard** for analytics and order management
4. **Use Design Studio** to create new products
5. **Monitor Performance** with detailed metrics

### For Customers

1. **Browse Marketplace** with filtering options
2. **View Product Details** with color variants
3. **Add to Cart** and manage quantities
4. **Complete Checkout** with order tracking
5. **Access Dashboard** for order history

### Admin Features

- Automated vendor/printer selection
- Profit optimization algorithms
- Order fulfillment tracking
- Performance analytics

##  Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev  # Create and apply migrations
npx prisma db seed   # Seed database with mock data
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting (via VS Code)

### Testing

```bash
# Run tests (when implemented)
npm run test
npm run test:watch
npm run test:coverage
```

##  Deployment

### Vercel (Recommended)

1. **Connect Repository** to Vercel
2. **Add Environment Variables** in Vercel dashboard
3. **Deploy** automatically on push

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-domain.com
```

##  Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed




