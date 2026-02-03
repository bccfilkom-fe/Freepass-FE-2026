/**
 * Payment RPC
 * Public API for payment-related operations
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */

import { getPaymentByOrderIdMock, uploadPaymentProofMock } from './_mock/payment.mock';
import { getPaymentByOrderIdReal, uploadPaymentProofReal } from './_real/payment.real';
import { createRpc } from "./utils";

/**
 * Get payment by order ID
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getPaymentByOrderId = createRpc(getPaymentByOrderIdMock, getPaymentByOrderIdReal);

/**
 * Upload payment proof
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const uploadPaymentProof = createRpc(uploadPaymentProofMock, uploadPaymentProofReal);
