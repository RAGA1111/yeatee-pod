# AI Coding Agent Instructions for POD App

## Project Overview
This is a Next.js 16 print-on-demand (POD) t-shirt application using TypeScript, Prisma ORM with PostgreSQL, and Tailwind CSS v4. Creators design t-shirts, set pricing, and the app calculates profits based on vendor costs and printer fees.

## Architecture
- **Framework**: Next.js 16 with App Router (`src/app/` structure)
- **Database**: Prisma with PostgreSQL (schema in `prisma/schema.prisma`)
- **Styling**: Tailwind CSS v4
- **Auth**: Custom API-based auth (no sessions; client stores user data)
- **Key Models**: User (CREATOR/CUSTOMER roles), Brand, Product, Order, Vendor, Printer

## Developer Workflows
- **Setup**: Set `DATABASE_URL` env var, run `npx prisma generate`, `npx prisma db push`, `npx prisma db seed`
- **Development**: `npm run dev` (auto-reloads)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint with Next.js rules)
- **Database**: Use `npx prisma studio` for GUI, `npx prisma migrate dev` for schema changes

## Code Patterns
- **Imports**: Use `@/*` path alias for `src/` (configured in `tsconfig.json`)
- **Prisma Client**: Import from `@/lib/prisma` (singleton pattern with global dev cache)
- **API Routes**: Return JSON with `{message, user?}` or `{error}`; handle errors with try/catch
- **Client Components**: Use `"use client"` for forms; fetch API with `fetch()` and `res.ok` checks
- **Auth Flow**: Login/signup APIs return user object; client handles state (no library yet)
- **Styling**: Mix of Tailwind classes and inline styles; prefer Tailwind for consistency

## Key Files
- `src/lib/prisma.ts`: Database client setup
- `prisma/schema.prisma`: Data models and relations
- `src/app/api/auth/`: Login/signup routes (bcrypt for passwords)
- `src/app/dashboard/page.tsx`: Creator dashboard (placeholder)
- `prisma/seed.js`: Sample vendors/printers data

## Conventions
- User roles: `CREATOR` for designers, `CUSTOMER` for buyers
- T-shirt types: `BASIC`/`PREMIUM` with different vendor costs
- Orders calculate `totalCost` and `creatorProfit` based on vendor/printer data
- No global state management; use local component state or localStorage for auth

## Integration Points
- PostgreSQL via Prisma (env `DATABASE_URL`)
- No external APIs yet; auth is internal
- Future: Payment processing, image uploads for designs</content>
<parameter name="filePath">c:\Users\RAGA T\OneDrive\pod-app\.github\copilot-instructions.md