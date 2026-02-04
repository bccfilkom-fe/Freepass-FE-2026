# Canteeneo 🍽️

**Canteeneo** is a modern digital platform for campus canteen operations, enabling students and staff to browse menus, place orders, and manage their dining experience seamlessly.

## 🚀 Features

### Customer Features
- **Browse Canteens** - Discover available canteens with ratings and operating status
- **Menu Exploration** - View detailed menu items with prices, categories, and availability
- **Smart Cart** - Add items to cart with quantity management and real-time total calculation
- **Order Management** - Track order status from placement to completion
- **Reviews & Ratings** - Read and write reviews for canteens and menu items
- **User Profile** - Manage personal information and preferences
- **Search & Filter** - Find canteens and menu items quickly with advanced filters

### Technical Features
- **Mock & Real API Support** - Seamlessly switch between mock and real backend
- **Optimistic Updates** - Instant UI feedback with TanStack Query optimistic updates
- **Responsive Design** - Mobile-first design that works on all devices
- **Type Safety** - Full TypeScript coverage with DTOs (currently still mock)
- **Modern UI** - Built with shadcn/ui and Tailwind CSS for a polished experience

## Current Status

### Completed
- [x] Project setup and architecture
- [x] UI component library integration (shadcn/ui)
- [x] Mock data layer implementation
- [x] State management (TanStack Query + Zustand)
- [x] Type definitions (DTOs and mappers)
- [x] Core components (Canteen, Menu, Cart, Review, Orders)
- [x] Routing structure
- [x] Search and filtering functionality
- [x] Responsive mobile-first design

### In Progress / Not Yet Implemented
- [ ] **Backend API Integration** - Currently using mock data only
- [ ] Real-time order tracking
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] User authentication & authorization
- [ ] Image upload functionality
- [ ] Advanced analytics
- [ ] Admin dashboard

### Notes
- The application is currently fully functional with **mock data**
- All RPC functions have mock implementations in `rpc/_mock/`
- Real API implementations are scaffolded in `rpc/_real/` but **not connected**
- To enable real API: Set `NEXT_PUBLIC_ENABLE_MOCK=false` and configure backend URL

## 🏗️ Architecture

### Overview

This project follows a **layered architecture** with clear separation of concerns, enabling flexibility, maintainability, and testability. The architecture is designed to support both mock and real API implementations seamlessly.

```
┌─────────────────────────────────────────────────────────────┐
│                     UI Layer (Components)                    │
│  - Presentation components                                   │
│  - User interactions                                         │
│  - Visual feedback                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Hooks Layer (React)                       │
│  - Custom hooks (use-canteens, use-orders, etc.)            │
│  - TanStack Query integration                               │
│  - State management integration                             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      RPC Layer                               │
│  - API abstraction                                           │
│  - Environment-aware routing (mock vs real)                 │
│  - Centralized API interface                                │
└──────────┬──────────────────────────────────┬───────────────┘
           │                                   │
┌──────────▼─────────┐              ┌─────────▼──────────────┐
│   Mock Layer       │              │   Real API Layer       │
│  - Local data      │              │  - HTTP requests       │
│  - Fast dev cycle  │              │  - Backend integration │
│  - No dependencies │              │  - Production ready    │
└────────────────────┘              └────────────────────────┘
```

### Key Architectural Patterns

#### 1. **RPC (Remote Procedure Call) Pattern**

**Why:** Abstracts away the complexity of API calls, making components agnostic to the data source.

**How it works:**
```typescript
// rpc/canteen.ts - Public interface
export const getCanteens = (params: GetCanteensParams) => {
  return ENABLE_MOCK 
    ? getCanteensMock(params)    // Mock implementation
    : getCanteensReal(params);   // Real API implementation
}
```

**Benefits:**
- ✅ Easy switching between mock and real APIs
- ✅ Components don't know where data comes from
- ✅ Simplified testing
- ✅ Gradual migration from mock to real API

#### 2. **DTO → Mapper → UI Types**

**Why:** Backend API contracts shouldn't dictate frontend structure. This pattern decouples backend from frontend concerns.

**Flow:**
```typescript
Backend API Response (DTO)
    ↓
Mapper Function (transforms data)
    ↓
UI-Friendly Types (used in components)
```

**Example:**
```typescript
// types/dto/index.ts - Backend contract
export interface CanteenDTO {
  id: string;
  canteen_name: string;  // snake_case from backend
  is_open: boolean;
  // ... more backend-specific fields
}

// types/mappers/canteen.mapper.ts - Transform logic
export const mapCanteenDTOToUI = (dto: CanteenDTO): Canteen => ({
  id: dto.id,
  name: dto.canteen_name,  // camelCase for frontend
  isOpen: dto.is_open,
  // ... computed fields, formatting, etc.
});

// types/ui/index.ts - Frontend types
export interface Canteen {
  id: string;
  name: string;
  isOpen: boolean;
}
```

**Benefits:**
- ✅ Backend changes don't break UI components
- ✅ Type safety across the entire stack
- ✅ Clear data transformation logic
- ✅ Easy to add computed properties or formatting

#### 3. **State Management Strategy**

**Three-tier approach based on data nature:**

| State Type | Tool | Use Case | Example |
|------------|------|----------|---------|
| **Server State** | TanStack Query | Remote data, caching, sync | Canteens, Orders, Reviews |
| **Client State** | Zustand | UI state, app-wide data | Cart, Sheet modals |
| **Form State** | React Hook Form | Form inputs, validation | Login, Review forms |

**Rationale:**
- **TanStack Query**: Handles server state complexity (caching, refetching, optimistic updates)
- **Zustand**: Minimal boilerplate for simple client state
- **React Hook Form**: Best-in-class form performance and validation

#### 4. **Custom Hooks Pattern**

**Why:** Encapsulate data fetching logic, making components cleaner and more reusable.

**Structure:**
```typescript
// hooks/use-canteens.ts
export const useCanteens = (params: GetCanteensParams) => {
  return useQuery({
    queryKey: queryKeys.canteens.list(params),
    queryFn: () => rpc.getCanteens(params),
  });
};
```

**Benefits:**
- ✅ Components focus on UI, not data fetching
- ✅ Automatic caching and revalidation
- ✅ Easy to test in isolation
- ✅ Consistent data fetching patterns

### Design Decisions & Rationale

#### Mock-First Development

**Decision:** Build with mock data first, add real API later

**Rationale:**
- Faster development without backend dependencies
- Frontend and backend teams can work in parallel
- Easy to demonstrate features without infrastructure
- Simplified testing and debugging

#### Type Safety Everywhere

**Decision:** Full TypeScript with DTOs derived from OpenAPI spec

**Rationale:**
- Catch errors at compile time, not runtime
- Better IDE autocomplete and documentation
- Easier refactoring and maintenance
- API contract enforcement

#### Query Key Factory Pattern

**Decision:** Centralized query key management in `lib/query-keys.ts`

**Rationale:**
- Prevents key collision bugs
- Easy cache invalidation
- Consistent naming convention
- Better debugging experience

```typescript
// lib/query-keys.ts
export const queryKeys = {
  canteens: {
    all: ['canteens'] as const,
    lists: () => [...queryKeys.canteens.all, 'list'] as const,
    list: (params: GetCanteensParams) => 
      [...queryKeys.canteens.lists(), params] as const,
    detail: (id: string) => 
      [...queryKeys.canteens.all, 'detail', id] as const,
  },
  // ... more keys
};
```

#### Component Organization

**Decision:** Feature-based component folders with index exports

**Rationale:**
- Clear module boundaries
- Easy to find related components
- Simpler imports (`from '@/components/canteen'`)
- Scalable as project grows

### Trade-offs & Considerations

| Decision | Pro | Con |
|----------|-----|-----|
| Mock-first approach | Fast development, no backend dependency | Need to maintain mock data |
| DTO mapping layer | Type safety, decoupling | Additional boilerplate |
| TanStack Query | Powerful caching, optimistic updates | Learning curve |
| pnpm | Faster installs, disk efficiency | Less common than npm/yarn |

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org)** - Type safety

### State Management & Data Fetching
- **[TanStack Query v5](https://tanstack.com/query)** - Server state management
- **[Zustand](https://zustand-demo.pmnd.rs)** - Client state management (cart, sheets)

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com)** - Headless UI primitives
- **[Lucide React](https://lucide.dev)** - Icon library
- **[Motion](https://motion.dev)** - Animation library
- **[Sonner](https://sonner.emilkowal.ski)** - Toast notifications

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com)** - Form management
- **[Zod](https://zod.dev)** - Schema validation

### Code Quality
- **[Biome](https://biomejs.dev)** - Fast linter and formatter
- **[ESLint](https://eslint.org)** - Additional linting

### Package Management
- **[pnpm](https://pnpm.io)** - Fast, disk space efficient package manager

## 📂 Project Structure

```
freepass-fe-2026/
├── app/                      # Next.js App Router
│   ├── (customer)/          # Customer-facing routes
│   │   ├── canteens/        # Canteen listing & details
│   │   ├── cart/            # Shopping cart
│   │   ├── orders/          # Order history & tracking
│   │   └── profile/         # User profile
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── canteen/            # Canteen-related components
│   ├── menu/               # Menu-related components
│   ├── review/             # Review components
│   ├── order/              # Order components
│   ├── cart/               # Cart components
│   ├── ui/                 # shadcn/ui components
│   └── providers/          # React context providers
├── hooks/                   # Custom React hooks
│   ├── use-canteens.ts     # Canteen data fetching
│   ├── use-orders.ts       # Order management
│   ├── use-reviews.ts      # Review operations
│   └── ...
├── rpc/                     # RPC layer (API abstraction)
│   ├── _mock/              # Mock API implementations
│   ├── _real/              # Real API implementations
│   └── *.ts                # Public RPC functions
├── stores/                  # Zustand stores
│   ├── cart-store.ts       # Shopping cart state
│   └── sheet-store.ts      # Bottom sheet state
├── types/                   # TypeScript types
│   ├── dto/                # Backend DTOs (from OpenAPI)
│   ├── mappers/            # DTO to UI type mappers
│   └── ui/                 # Frontend-specific types
└── lib/                     # Utilities & config
    ├── constants.ts        # App constants
    ├── query-client.ts     # TanStack Query config
    ├── query-keys.ts       # Query key factory
    └── utils.ts            # Helper functions
```

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (install with `npm install -g pnpm`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freepass-fe-2026
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_ENABLE_MOCK=true  # Set to 'false' for real API
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm fmt          # Format code with Biome
pnpm check        # Run Biome check (lint + format)
```

## Development

### Mock vs Real API

The project supports both mock and real API implementations:

- **Mock Mode** (default): Uses local mock data from `rpc/_mock/`
- **Real Mode**: Connects to actual backend API

Toggle mode via `NEXT_PUBLIC_ENABLE_MOCK` environment variable or in `lib/constants.ts`.

### Adding New Features

1. **Define DTOs** in `types/dto/index.ts` (from OpenAPI spec)
2. **Create Mapper** in `types/mappers/` to convert DTO to UI types
3. **Implement RPC** in `rpc/` for both mock and real
4. **Create Hook** in `hooks/` using TanStack Query
5. **Build Component** in `components/` with the hook
6. **Add Route** in `app/` if needed

### Type Safety

All API contracts are defined as DTOs in `types/dto/index.ts`. These are mapped to UI-friendly types using mapper functions. This ensures:

- ✅ Type safety between frontend and backend
- ✅ Separation of API concerns from UI logic
- ✅ Easy maintenance when API changes

### State Management Strategy

- **Server State**: TanStack Query (canteens, orders, reviews)
- **Client State**: Zustand (cart, UI sheets)
- **Form State**: React Hook Form

## UI Components

This project uses **shadcn/ui** components. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add dialog
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured canteens |
| `/canteens` | Browse all canteens |
| `/canteens/[id]` | Canteen details with menu |
| `/cart` | Shopping cart |
| `/orders` | Order history |
| `/orders/[id]` | Order details & tracking |
| `/profile` | User profile |


Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use **Biome** for linting and formatting
- Follow **TypeScript** best practices
- Write **descriptive commit messages**
- Add **JSDoc comments** for complex functions

## Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [TanStack Query](https://tanstack.com/query) - Powerful data fetching
- [Vercel](https://vercel.com) - Hosting platform