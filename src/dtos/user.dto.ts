// src/dtos/user.dto.ts

export interface UserProfileDTO {
  id: number;
  name: string;
  email: string;
  description: string | null;
  role: string;
  profileImage: string | null;
}

export interface UpdateProfileInputDTO {
  userId: number;
  name: string;
  email: string;
  description?: string | null;
  profileImage?: string | null;
}

export interface ChangePasswordInputDTO {
  userId: number;
  currentPassword: string;
  newPassword: string;
}
