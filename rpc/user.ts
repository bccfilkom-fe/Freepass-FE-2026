/**
 * User RPC
 * Public API for user-related operations
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */

import { getCurrentUserMock, updateUserProfileMock } from "./_mock/user.mock";
import { getCurrentUserReal, updateUserProfileReal } from "./_real/user.real";
import { createRpc } from "./utils";

/**
 * Get current authenticated user
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getCurrentUser = createRpc(getCurrentUserMock, getCurrentUserReal);

/**
 * Update user profile
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const updateUserProfile = createRpc(
  updateUserProfileMock,
  updateUserProfileReal,
);
