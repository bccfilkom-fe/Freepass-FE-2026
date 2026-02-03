/**
 * Mock User Data
 */

import type { UserDTO } from "@/types/dto";
import { UserRole } from "@/types/dto";
import { generateTimestamp, generateUUID } from "./utils";

export const mockUsers: UserDTO[] = [
  {
    id: generateUUID(),
    email: "customer@student.ub.ac.id",
    fullName: "Budi Santoso",
    phoneNumber: "+628123456789",
    role: UserRole.USER,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    isActive: true,
    createdAt: generateTimestamp(90),
    updatedAt: generateTimestamp(5),
  },
  {
    id: generateUUID(),
    email: "owner@canteen.ub.ac.id",
    fullName: "Siti Aminah",
    phoneNumber: "+628987654321",
    role: UserRole.CANTEEN_OWNER,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
    isActive: true,
    createdAt: generateTimestamp(180),
    updatedAt: generateTimestamp(2),
  },
  {
    id: generateUUID(),
    email: "admin@bcc.ub.ac.id",
    fullName: "Ahmad Admin",
    phoneNumber: "+628111222333",
    role: UserRole.ADMIN,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
    isActive: true,
    createdAt: generateTimestamp(365),
    updatedAt: generateTimestamp(1),
  },
];

export const mockCurrentUser = mockUsers[0]; // Default to customer
