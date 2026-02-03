/**
 * Payment Mappers
 * Transform payment DTOs from backend to UI-friendly types
 */

import type { OrderDTO } from '../dto';
import { PaymentMethod } from '../dto';
import type { PaymentInfo } from '../ui';

/**
 * Map OrderDTO to PaymentInfo UI type
 * Payment info is embedded in OrderDTO
 */
export function mapPaymentInfo(dto: OrderDTO): PaymentInfo {
  return {
    orderId: dto.id,
    paymentMethod: dto.paymentMethod || PaymentMethod.CASH, // Default to CASH if null
    paymentStatus: dto.paymentStatus,
    paidAt: undefined, // TODO: Add paidAt field to OrderDTO when backend implements it
  };
}
