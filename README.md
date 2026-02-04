# ShipIt - Modern E-Commerce Platform

<div align="center">

<img src="./src/app/favicon.ico" alt="ShipIt" width="200" />

<br />

![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Your one-stop shop for everything** — A modern e-commerce web application built with Next.js featuring product browsing, shopping cart, and authentication.

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/dirgaydtm/freepass-fe-2026.git
cd freepass-fe-2026
git checkout dirga-yuditama

# Install dependencies
npm install
# or
bun install # i use this for development

# Run development server
npm run dev
# or
bun run dev # i use this for development
```

Open [http://localhost:3000](http://localhost:3000) to view the app.


## ✨ Features

- **Product Browsing** - Browse products with beautiful page
- **Product Categories** - Filter products by categories
- **Shopping Cart** - Add, remove, and manage cart items with persistent state
- **User Authentication** - Login system with token-based auth
- **Responsive Design** - Optimized for all screen sizes
- **Theme Support** - Light, dark, and system theme modes

## 🛠️ Tech Stack

| Category             | Technology                       |
| -------------------- | -------------------------------- |
| Framework            | Next.js 16.1                     |
| Language             | TypeScript 5                     |
| UI Library           | React 19.2                       |
| Styling              | Tailwind CSS 4                   |
| State Management     | Zustand 5.0                      |
| Server State         | TanStack React Query 5.90        |
| HTTP Client          | Axios 1.13                       |
| Schema Validation    | Zod 4.3                          |
| UI Components        | shadcn/ui, Radix UI              |

## 📁 Project Structure

```
src/
├── app/                       
│   ├── (auth)/                
│   │   └── login/             
│   ├── (main)/                
│   │   ├── cart/              
│   │   ├── products/          
│   │   └── profile/           
│   ├── layout.tsx             
│   ├── page.tsx               
│   └── providers.tsx          
├── features/                  
│   ├── auth/                  
│   │   ├── api.ts             
│   │   ├── hooks.ts           
│   │   ├── schema.ts          
│   │   ├── store.ts           
│   │   └── components/        
│   ├── cart/                 
│   │   ├── api.ts             
│   │   ├── hooks.ts           
│   │   ├── schema.ts          
│   │   ├── store.ts           
│   │   └── components/        
│   └── product/               
│       ├── api.ts             
│       ├── hooks.ts           
│       ├── schema.ts          
│       ├── store.ts           
│       └── components/        
├── shared/                   
│   ├── components/    
│   ├── hooks/                 
│   └── lib/                   
│       ├── axios.ts           
│       ├── queryClient.ts     
│       └── utils.ts           
└── styles/                    
```

## 🌐 API Endpoints

The app connects to [FakeStoreAPI](https://fakestoreapi.com) with the following endpoints:

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/auth/login`          | Login user           |
| GET    | `/users`               | Get all users        |
| DELETE | `/users/{id}`          | Delete user          |
| GET    | `/products`            | Get all products     |
| GET    | `/products/{id}`       | Get single product   |
| GET    | `/products/categories` | Get all categories   |
| PUT    | `/carts/{id}`          | Update cart          |

