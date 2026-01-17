# 🎓 Fundamental POD System

A demonstration of Print-on-Demand core logic, stripping away enterprise bloat to focus on data flow and business rules.

## Core Principles
- **Simplicity**: No complex auth, no microservices, no payment gateways.
- **Transparency**: Every order records the exact cost breakdown at the time of purchase.
- **Deterministic Logic**: Vendor selection is a pure function of `(Base Cost + Print Cost)`.

## Tech Stack
- **Next.js 16** (App Router & Server Actions)
- **SQLite** (Local simplified database)
- **Prisma** (Schema & ORM)
- **Tailwind CSS** (Utility styling)

## Architecture
1. **Design**: User uploads an image → Saved to disk + DB record.
2. **Product**: Creator links Design to Fixed Specs (Size/Color) → DB record.
3. **Order**: Customer buys Product → System selects Best Vendor → Records Transaction.

## Setup
```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

## Vendor Selection Logic
Located in `src/lib/core.ts`:
```typescript
export function selectBestVendor(vendors: Vendor[]): Vendor | null {
  // Sort by (BaseCost + PrintCost)
  // Pick the lowest.
}
```
