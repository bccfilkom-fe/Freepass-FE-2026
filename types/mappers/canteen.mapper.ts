/**
 * Canteen & Menu Mappers
 * Transform DTOs from backend to UI-friendly types
 */

import type { CanteenDTO, MenuItemDTO } from '../dto';
import type { Canteen, MenuItem } from '../ui';

/**
 * Map CanteenDTO to Canteen UI type
 */
export function mapCanteen(dto: CanteenDTO): Canteen {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    location: dto.location,
    imageUrl: dto.imageUrl || '/placeholder-canteen.jpg',
    rating: dto.rating,
    totalReviews: dto.totalReviews,
    isActive: dto.isActive,
  };
}

/**
 * Map MenuItemDTO to MenuItem UI type
 */
export function mapMenuItem(dto: MenuItemDTO): MenuItem {
  return {
    id: dto.id,
    canteenId: dto.canteenId,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    category: dto.category,
    imageUrl: dto.imageUrl || '/placeholder-menu.jpg',
    isAvailable: dto.isAvailable,
    stock: dto.stock,
  };
}
