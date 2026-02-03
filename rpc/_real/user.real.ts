/**
 * User Real RPC
 * Real API implementations for user-related calls
 */

import { API_BASE_URL } from '@/lib/constants';
import type { UserDTO } from '@/types/dto';

/**
 * Get current authenticated user (real API)
 * TODO: Implement when backend is ready
 */
export async function getCurrentUserReal(): Promise<UserDTO> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

/**
 * Update user profile (real API)
 * TODO: Implement when backend is ready
 */
export async function updateUserProfileReal(
  data: { fullName?: string; phoneNumber?: string; avatarUrl?: string }
): Promise<UserDTO> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
}
