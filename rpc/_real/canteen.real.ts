/**
 * Canteen Real RPC
 * Real API implementations for canteen-related calls
 */

import { API_BASE_URL } from '@/lib/constants';
import type { CanteenDTO, MenuItemDTO } from '@/types/dto';

/**
 * Get all canteens (real API)
 * TODO: Implement when backend is ready
 */
export async function getCanteensReal(): Promise<CanteenDTO[]> {
  const response = await fetch(`${API_BASE_URL}/canteens`);
  if (!response.ok) {
    throw new Error('Failed to fetch canteens');
  }
  return response.json();
}

/**
 * Get canteen by ID (real API)
 * TODO: Implement when backend is ready
 */
export async function getCanteenByIdReal(id: string): Promise<CanteenDTO> {
  const response = await fetch(`${API_BASE_URL}/canteens/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch canteen');
  }
  return response.json();
}

/**
 * Get menu items for a canteen (real API)
 * TODO: Implement when backend is ready
 */
export async function getCanteenMenuReal(canteenId: string): Promise<MenuItemDTO[]> {
  const response = await fetch(`${API_BASE_URL}/canteens/${canteenId}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}
