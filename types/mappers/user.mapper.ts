/**
 * User Mappers
 * Transform user DTOs from backend to UI-friendly types
 */

import type { UserDTO } from "../dto";
import type { User } from "../ui";

const getInitials = (fullName: string) => {
  const names = fullName.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
};

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
      // `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(dto.fullName)}`,
      `https://avatar.vecel.sh/${dto.email}?text=${getInitials(dto.fullName)}`,
    isActive: dto.isActive,
  };
}
