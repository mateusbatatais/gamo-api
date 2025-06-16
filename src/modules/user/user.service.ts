import * as userRepository from "./user.repository";
import bcrypt from "bcryptjs";
import { UserProfile, UpdateProfileInput, ChangePasswordInput } from "./user.schema";
import { AppError } from "@shared/errors";

export const getUserById = async (userId: number): Promise<UserProfile> => {
  return userRepository.getUserById(userId);
};

export const updateProfile = async (userId: number, input: UpdateProfileInput) => {
  const existing = await userRepository.getUserByEmail(input.email);
  if (existing && existing.id !== userId)
    throw new AppError(400, "EMAIL_IN_USE", "Email already in use");

  return userRepository.updateUser(userId, {
    name: input.name,
    email: input.email,
    description: input.description,
    profileImage: input.profileImage,
  });
};

export const changePassword = async (
  userId: number,
  input: Omit<ChangePasswordInput, "confirmNewPassword">,
) => {
  const user = await userRepository.getUserWithPasswordById(userId);

  if (!user?.password) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(input.currentPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Current password is incorrect");
  }

  const newHashed = await bcrypt.hash(input.newPassword, 10);
  await userRepository.updateUser(userId, { password: newHashed });
};
