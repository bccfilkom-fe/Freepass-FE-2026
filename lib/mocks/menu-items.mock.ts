/**
 * Mock Menu Items Data
 */

import type { MenuItemDTO } from "@/types/dto";
import { MenuCategory } from "@/types/dto";
import { canteenIds } from "./canteens.mock";
import {
  generateTimestamp,
  generateUUID,
  randomBoolean,
  randomNumber,
} from "./utils";

const foodItems = [
  {
    name: "Nasi Goreng Special",
    description: "Fried rice with chicken, egg, and vegetables",
    price: 15000,
  },
  {
    name: "Mie Goreng",
    description: "Stir-fried noodles with vegetables and choice of protein",
    price: 13000,
  },
  {
    name: "Ayam Geprek",
    description: "Crispy fried chicken with spicy sambal",
    price: 18000,
  },
  {
    name: "Nasi Uduk",
    description: "Fragrant coconut rice with side dishes",
    price: 12000,
  },
  {
    name: "Gado-Gado",
    description: "Indonesian salad with peanut sauce",
    price: 10000,
  },
  {
    name: "Soto Ayam",
    description: "Traditional chicken soup with rice",
    price: 14000,
  },
  { name: "Bakso", description: "Meatball soup with noodles", price: 12000 },
  {
    name: "Nasi Pecel",
    description: "Rice with mixed vegetables and peanut sauce",
    price: 11000,
  },
  {
    name: "Sate Ayam",
    description: "Grilled chicken skewers with peanut sauce",
    price: 16000,
  },
  {
    name: "Nasi Rawon",
    description: "Black beef soup with rice",
    price: 17000,
  },
];

const beverageItems = [
  { name: "Es Teh Manis", description: "Sweet iced tea", price: 3000 },
  { name: "Es Jeruk", description: "Fresh orange juice", price: 5000 },
  { name: "Kopi Hitam", description: "Black coffee", price: 4000 },
  { name: "Teh Tarik", description: "Pulled milk tea", price: 6000 },
  { name: "Es Campur", description: "Mixed ice dessert", price: 8000 },
  { name: "Jus Alpukat", description: "Avocado juice", price: 10000 },
  { name: "Air Mineral", description: "Bottled water", price: 2000 },
  { name: "Es Kelapa Muda", description: "Young coconut ice", price: 7000 },
];

export const mockMenuItems: MenuItemDTO[] = [];

// Generate menu items for each canteen
canteenIds.forEach((canteenId, _canteenIndex) => {
  // Add 5-8 food items per canteen
  const numFoods = randomNumber(5, 8);
  for (let i = 0; i < numFoods; i++) {
    const food = foodItems[i % foodItems.length];
    const stock = randomNumber(0, 50); // Some items may be out of stock

    mockMenuItems.push({
      id: generateUUID(),
      canteenId,
      name: food.name,
      description: food.description,
      category: MenuCategory.FOOD,
      price: food.price + randomNumber(-2000, 3000), // Slight price variation
      stock,
      imageUrl: `https://images.unsplash.com/photo-${1565958011703 + i}?w=400&h=300&fit=crop`,
      isAvailable: stock > 0 && randomBoolean(),
      createdAt: generateTimestamp(randomNumber(30, 180)),
      updatedAt: generateTimestamp(randomNumber(0, 10)),
    });
  }

  // Add 3-5 beverage items per canteen
  const numBeverages = randomNumber(3, 5);
  for (let i = 0; i < numBeverages; i++) {
    const beverage = beverageItems[i % beverageItems.length];
    const stock = randomNumber(10, 100);

    mockMenuItems.push({
      id: generateUUID(),
      canteenId,
      name: beverage.name,
      description: beverage.description,
      category: MenuCategory.BEVERAGE,
      price: beverage.price + randomNumber(-500, 1000),
      stock,
      imageUrl: `https://images.unsplash.com/photo-${1544145945 + i}?w=400&h=300&fit=crop`,
      isAvailable: stock > 0 && randomNumber(1, 100) > 10, // 90% available
      createdAt: generateTimestamp(randomNumber(30, 180)),
      updatedAt: generateTimestamp(randomNumber(0, 10)),
    });
  }
});
