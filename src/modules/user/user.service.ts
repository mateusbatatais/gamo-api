import * as userRepository from "./user.repository";
import bcrypt from "bcryptjs";
import {
  UserProfile,
  UpdateProfileInput,
  ChangePasswordInput,
  SetInitialPasswordInput,
} from "./user.schema";
import { AppError } from "../../shared/errors";
import jwt from "jsonwebtoken";

export const getUserById = async (userId: number): Promise<UserProfile> => {
  return userRepository.getUserById(userId);
};

export const updateProfile = async (userId: number, input: UpdateProfileInput) => {
  if (input.email) {
    const existing = await userRepository.getUserByEmail(input.email);
    if (existing && existing.id !== userId) {
      throw new AppError(400, "EMAIL_IN_USE", "Email already in use");
    }
  }

  if (input.slug) {
    const slugExists = await userRepository.checkSlugAvailability(input.slug, userId);
    if (slugExists) {
      throw new AppError(400, "SLUG_IN_USE", "This slug is already taken");
    }
  }

  return userRepository.updateUser(userId, {
    name: input.name,
    slug: input.slug,
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

export const setInitialPassword = async (userId: number, input: SetInitialPasswordInput) => {
  const hasPassword = await userRepository.userHasPassword(userId);

  if (hasPassword) {
    throw new AppError(400, "PASSWORD_EXISTS", "Password already set");
  }

  const newHashed = await bcrypt.hash(input.newPassword, 10);
  const updatedUser = await userRepository.updateUser(userId, {
    password: newHashed,
  });

  const newToken = jwt.sign(
    {
      userId: updatedUser.id,
      role: updatedUser.role,
      email: updatedUser.email,
      name: updatedUser.name,
      slug: updatedUser.slug,
      profileImage: updatedUser.profileImage,
      hasPassword: true,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return {
    user: updatedUser,
    token: newToken,
  };
};
