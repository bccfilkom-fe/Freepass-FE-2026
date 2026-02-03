/**
 * Payment Real RPC
 * Real API implementations for payment-related calls
 */

import { API_BASE_URL } from '@/lib/constants';
import type { OrderDTO } from '@/types/dto';

/**
 * Get payment info by order ID (real API)
 * TODO: Implement when backend is ready
 */
export async function getPaymentByOrderIdReal(orderId: string): Promise<OrderDTO> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch payment info');
  }
  return response.json();
}

/**
 * Upload payment proof (real API)
 * TODO: Implement when backend is ready
 */
export async function uploadPaymentProofReal(
  orderId: string,
  file: File
): Promise<OrderDTO> {
  const formData = new FormData();
  formData.append('proof', file);
  
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/payment/proof`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload payment proof');
  }
  return response.json();
}
