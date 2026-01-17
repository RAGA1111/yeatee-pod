# Creator-First POD Platform - Handover

## Overview
This platform is a Next.js application designed to empower creators with a transparent, agent-driven Print-on-Demand system.

## Key Features Implemented

### 1. Role-Based Mode Switching
- **Location**: Top Navigation Bar
- **Action**: Click the "Switch to Creator/Customer" button.
- **Behavior**: Instantly toggles the UI between the Customer Marketplace and the Creator Dashboard without reloading the page.

### 2. Design Studio (Creator Mode)
- **Location**: `Creator Dashboard` -> `Create New Product`
- **Features**:
  - **Live Preview**: Upload an image and see it on a T-shirt mock.
  - **Interactive**: Drag the design to position it; use the slider to scale it.
  - **Colors**: Toggle T-shirt colors to see how the design adapts.
  - **Profit Logic**: Real-time calculation of Creator Profit based on selling price and costs.

### 3. Listings Management (Creator Mode)
- **Location**: Creator Home Page
- **Features**:
  - Detailed table view of products.
  - Metrics: Price, Status, Units Sold, and Net Profit.

### 4. Agent-Driven Decision Engine (Customer Mode)
- **Location**: `Cart` -> `Checkout`
- **Flow**:
  1. Add items to Cart.
  2. Click Checkout (simulated).
  3. The **Decision Engine** runs to select the best Vendor and Printer based on Profit, Reliability, and Availability.
  4. Redirects to **Order Status Page**.
- **Explanation**: The Order Status page displays a "Agent Decision Log" explaining strictly *why* a specific vendor/printer was chosen (e.g., "Cost efficiency", "High availability").

## Project Structure
- `src/app/creator/create/page.tsx`: The Design Studio logic.
- `src/lib/decisionEngine.ts`: The logic for the Agent/AI selection.
- `src/app/orders/[id]/page.tsx`: The Order tracking and explanation view.
- `src/app/page.tsx`: The main entry point with Role-based rendering.

## Running the App
```bash
npm run dev
```
Visit `http://localhost:3000`.
