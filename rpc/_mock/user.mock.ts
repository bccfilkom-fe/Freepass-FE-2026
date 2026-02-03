/**
 * User Mock RPC
 * Mock implementations for user-related API calls
 */

import { mockCurrentUser } from '@/lib/mocks/users.mock';
import { delay } from "@/lib/mocks/utils";
import type { UserDTO } from '@/types/dto';

/**
 * Get current authenticated user (mock)
 */
export async function getCurrentUserMock(): Promise<UserDTO> {
  await delay(500);
  
  // Auth-related functions should NOT have random errors
  return mockCurrentUser;
}

/**
 * Update user profile (mock)
 */
export async function updateUserProfileMock(
  data: { fullName?: string; phoneNumber?: string; avatarUrl?: string }
): Promise<UserDTO> {
  await delay(800);
  
  // Return updated mock user
  return {
    ...mockCurrentUser,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}
