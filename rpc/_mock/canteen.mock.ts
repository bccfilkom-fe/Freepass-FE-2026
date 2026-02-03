/**
 * Canteen Mock RPC
 * Mock implementations for canteen-related API calls
 */

import { delay } from '@/lib/mocks/utils';
import { mockCanteens } from '@/lib/mocks/canteens.mock';
import { mockMenuItems } from '@/lib/mocks/menu-items.mock';
import type { CanteenDTO, MenuItemDTO } from '@/types/dto';

/**
 * Get all canteens (mock)
 */
export async function getCanteensMock(): Promise<CanteenDTO[]> {
  await delay(800);
  
  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch canteens');
  }
  
  return mockCanteens;
}

/**
 * Get canteen by ID (mock)
 */
export async function getCanteenByIdMock(id: string): Promise<CanteenDTO> {
  await delay(600);
  
  const canteen = mockCanteens.find((c) => c.id === id);
  if (!canteen) {
    throw new Error('Canteen not found');
  }
  
  return canteen;
}

/**
 * Get menu items for a canteen (mock)
 */
export async function getCanteenMenuMock(canteenId: string): Promise<MenuItemDTO[]> {
  await delay(700);
  
  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch menu items');
  }
  
  return mockMenuItems.filter((item) => item.canteenId === canteenId);
}
