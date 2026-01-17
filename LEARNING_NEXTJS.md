# Learning Next.js with Your Project (`pod-app`)

This guide uses your actual code to explain core Next.js concepts. Your project is currently built as a **High-Fidelity Prototype** using the App Router, Client Components, and Mock Data.

## 1. The App Router Structure (`src/app`)
In Next.js 13+, the file system *is* the router. Folders inside `src/app` define your URL paths.

### Your Routes:
- **Home**: `src/app/page.tsx` → `http://localhost:3000/`
- **Creator Dashboard**: `src/app/creator/create/page.tsx` → `http://localhost:3000/creator/create`
- **Dynamic Product Page**: `src/app/product/[id]/page.tsx` → `http://localhost:3000/product/123`
    - The `[id]` folder acts as a wildcard parameter.

## 2. Pages vs. Layouts
Next.js separates specific page content from shared UI (like headers/footers).

- **Page (`page.tsx`)**: The UI unique to that route.
    - [View your Home Page](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/app/page.tsx)
- **Layout (`layout.tsx`)**: Shared UI that wraps the pages. It preserves state when navigating between pages.
    - [View your Root Layout](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/app/layout.tsx)
    - Notice how it wraps `{children}` with `UserProvider` and `CartProvider`. This ensures your user session persists across all pages.

## 3. Server Components vs. Client Components
This is the most important concept in modern Next.js.

### Server Components (Default)
**What:** Rendered on the server. Send only HTML to the browser (zero JavaScript for logic).
**Where:** `src/app/layout.tsx` is a Server Component.
**Why:** Faster initial load, SEO friendly, secure access to database (e.g. Prisma) directly.

### Client Components (`"use client"`)
**What:** Rendered on the client. Allow interactivity (useState, useEffect, onClick).
**Where:** [src/app/page.tsx](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/app/page.tsx)
**Sign:** Keep an eye out for `"use client";` at the very top of the file.
**Your Usage:** 
```tsx
"use client"; // <--- This line marks it as a Client Component

import { useUser } from "@/contexts/UserContext";

export default function HomePage() {
  const { isCreator } = useUser(); // <--- Hooks strictly work only in Client Components
  // ...
}
```
**Why you used it here:** You need access to `useUser()` context to toggle between "Creator Mode" and "Customer Mode".

## 4. Data Handling (Prototype vs. Production)
Currently, your app allows you to code the UI without waiting for the backend.

### Current: Mock Data
You are importing static arrays from a data file. This is excellent for prototyping.
- **Source:** [src/lib/data.ts](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/lib/data.ts)
- **Usage:** In `HomePage`, you do `import { products } from "@/lib/data";` and map over them.

### Future: Real Database (Prisma)
When ready for "Production", you will switch to fetching data from your database using Prisma.
- **Setup:** You already have [src/lib/prisma.ts](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/lib/prisma.ts) ready.
- **Migration:**
  1. Remove `import { products } from "@/lib/data"`.
  2. Make the component `async`.
  3. Call `await prisma.product.findMany()`.

**Example of the Future Transition:**
```tsx
// src/app/page.tsx (Refactored to Server Component)
import prisma from "@/lib/prisma"; // Direct DB access

export default async function HomePage() {
  // Fetch data directly on the server
  const products = await prisma.product.findMany({
    where: { isActive: true }
  });

  return (
    // Pass data to Client Components if interactivity is needed
    <ProductGrid products={products} />
  );
}
```

## 5. Global State (Context API)
Since you don't have a backend session yet, you are using React Context to simulate authentication.
- **User Context:** [src/contexts/UserContext.tsx](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/contexts/UserContext.tsx) (Assumed path based on imports)
- **Cart Context:** [src/contexts/CartContext.tsx](file:///c:/Users/RAGA%20T/OneDrive/pod-app/src/contexts/CartContext.tsx)
- **How it works:** These are wrapped around your app in `layout.tsx`, making `currentUser` and `cartItems` available everywhere via hooks like `useUser()`.

## Next Steps for Learning
1. **Create a Route**: Try creating `src/app/about/page.tsx` and see it appear at `/about`.
2. **Server Action**: Try to write a "Server Action" to handle form submissions (e.g. creating a product) instead of just `console.log`.
