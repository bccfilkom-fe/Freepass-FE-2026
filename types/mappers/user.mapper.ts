/**
 * User Mappers
 * Transform user DTOs from backend to UI-friendly types
 */

import type { UserDTO } from "../dto";
import type { User } from "../ui";

/**
 * Map UserDTO to User UI type
 */
export function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,
    email: dto.email,
    fullName: dto.fullName,
    phoneNumber: dto.phoneNumber,
    role: dto.role,
    avatarUrl:
      dto.avatarUrl ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(dto.fullName)}`,
    isActive: dto.isActive,
  };
}
