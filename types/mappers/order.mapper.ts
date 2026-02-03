/**
 * Order Mappers
 * Transform order DTOs from backend to UI-friendly types
 */

import type { OrderDTO, OrderItemDTO } from '../dto';
import type { Order, OrderItem } from '../ui';

/**
 * Map OrderItemDTO to OrderItem UI type
 */
export function mapOrderItem(dto: OrderItemDTO): OrderItem {
  return {
    id: dto.id,
    menuItemName: 'Menu Item', // TODO: Fetch from menu API or include in DTO
    quantity: dto.quantity,
    priceAtOrder: dto.priceAtOrder,
    subtotal: dto.subtotal,
  };
}

/**
 * Map OrderDTO to Order UI type
 */
export function mapOrder(dto: OrderDTO): Order {
  const createdDate = new Date(dto.createdAt);
  
  return {
    id: dto.id,
    canteenId: dto.canteenId,
    canteenName: 'Canteen Name', // TODO: Fetch from canteen API or include in DTO
    items: dto.items.map(mapOrderItem),
    totalAmount: dto.totalAmount,
    orderStatus: dto.orderStatus,
    paymentStatus: dto.paymentStatus,
    paymentMethod: dto.paymentMethod,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    // Computed fields
    formattedDate: createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    formattedTime: createdDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    itemCount: dto.items.reduce((sum, item) => sum + item.quantity, 0),
  };
}
