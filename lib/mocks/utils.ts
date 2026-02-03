/**
 * Mock Utility Functions
 * Helper functions for mock data generation and simulation
 */

import { MOCK_DELAYS } from "../constants";

/**
 * Simulate network delay
 * @param min Minimum delay in milliseconds
 * @param max Maximum delay in milliseconds
 */
export async function delay(
  min: number = MOCK_DELAYS.MIN,
  max: number = MOCK_DELAYS.MAX,
): Promise<void> {
  const duration = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Generate a UUID-like string
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get random item from array
 */
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random number between min and max (inclusive)
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random float between min and max
 */
export function randomFloat(
  min: number,
  max: number,
  decimals: number = 2,
): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

/**
 * Get random boolean
 */
export function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Generate random date within range
 */
export function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

/**
 * Generate ISO timestamp
 */
export function generateTimestamp(daysAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

/**
 * Paginate array
 */
export function paginate<T>(items: T[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
    },
  };
}

/**
 * Filter items by search query (case-insensitive)
 */
export function filterBySearch<T>(
  items: T[],
  query: string,
  fields: (keyof T)[],
): T[] {
  if (!query) return items;

  const lowerQuery = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      return (
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      );
    }),
  );
}

/**
 * Sort items by field
 */
export function sortBy<T>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
