/**
 * RPC Utilities
 * Centralized mode-switching logic between mock and real API
 */

import { ENABLE_MOCK } from '@/lib/constants';

/**
 * Creates an RPC function that switches between mock and real implementation
 * based on NEXT_PUBLIC_ENABLE_MOCK environment variable
 * 
 * @param mockFn - Mock implementation (returns mock data)
 * @param realFn - Real implementation (calls actual API)
 * @returns Function that calls either mock or real based on ENABLE_MOCK
 */
export function createRpc<TArgs extends unknown[], TReturn>(
  mockFn: (...args: TArgs) => Promise<TReturn>,
  realFn: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return ENABLE_MOCK ? mockFn : realFn;
}

/**
 * Helper to check if we're in mock mode
 */
export const isMockMode = () => ENABLE_MOCK;

/**
 * Log RPC mode on first import (development only)
 */
if (process.env.NODE_ENV === 'development') {
  console.log(`[RPC] Mode: ${ENABLE_MOCK ? '🎭 MOCK' : '🌐 REAL API'}`);
}
