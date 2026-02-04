/**
 * Mock Canteen Data
 */

import type { CanteenDTO } from "@/types/dto";
import { generateTimestamp, generateUUID } from "./utils";

export const mockCanteens: CanteenDTO[] = [
  {
    id: generateUUID(),
    name: "Warung Nasi Ibu Siti",
    description:
      "Traditional Indonesian food and beverages with authentic home-cooked taste",
    location: "Building A, Ground Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.7,
    totalReviews: 156,
    createdAt: generateTimestamp(180),
    updatedAt: generateTimestamp(2),
  },
  {
    id: generateUUID(),
    name: "Kantin Barokah",
    description:
      "Fast food, snacks, and refreshing drinks for students on the go",
    location: "Building B, 1st Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.3,
    totalReviews: 89,
    createdAt: generateTimestamp(120),
    updatedAt: generateTimestamp(5),
  },
  {
    id: generateUUID(),
    name: "Kafe Mahasiswa",
    description: "Modern cafe serving coffee, pastries, and light meals",
    location: "Library Building, 2nd Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.8,
    totalReviews: 203,
    createdAt: generateTimestamp(90),
    updatedAt: generateTimestamp(1),
  },
  {
    id: generateUUID(),
    name: "Warung Pak Haji",
    description: "Halal food with various menu options for breakfast and lunch",
    location: "Building C, Ground Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.5,
    totalReviews: 124,
    createdAt: generateTimestamp(200),
    updatedAt: generateTimestamp(7),
  },
  {
    id: generateUUID(),
    name: "Kantin Sehat",
    description:
      "Healthy food options with fresh ingredients and nutritious meals",
    location: "Sports Center, 1st Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.6,
    totalReviews: 97,
    createdAt: generateTimestamp(60),
    updatedAt: generateTimestamp(3),
  },
  {
    id: generateUUID(),
    name: "Warung Bakso Mas Bro",
    description:
      "Specialty in meatballs and noodle soups with generous portions",
    location: "Building D, Ground Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: false, // Temporarily closed
    rating: 4.4,
    totalReviews: 78,
    createdAt: generateTimestamp(150),
    updatedAt: generateTimestamp(30),
  },
  {
    id: generateUUID(),
    name: "Kantin Express",
    description:
      "Quick service canteen with affordable prices for busy students",
    location: "Engineering Building, Ground Floor",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.1,
    totalReviews: 142,
    createdAt: generateTimestamp(100),
    updatedAt: generateTimestamp(4),
  },
  {
    id: generateUUID(),
    name: "Warung Nasi Goreng 24",
    description: "Open late! Serving delicious fried rice and midnight snacks",
    location: "Dormitory Area, Block A",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    ownerId: generateUUID(),
    isActive: true,
    rating: 4.9,
    totalReviews: 267,
    createdAt: generateTimestamp(240),
    updatedAt: generateTimestamp(1),
  },
];

// Store canteen IDs for use in other mocks
export const canteenIds = mockCanteens.map((c) => c.id);
