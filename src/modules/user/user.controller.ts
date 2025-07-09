// user.controller.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { updateProfileSchema, changePasswordSchema, setInitialPasswordSchema } from "./user.schema";
import { validate } from "../../middleware/validate.middleware.ts";
import { AnyZodObject } from "zod";

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    name: string;
    slug: string;
    email: string;
    profileImage: string | null;
    role: string;
    hasPassword: boolean;
  };
}

// Middleware de validação modificado para aceitar ZodSchema genérico
const validateSchema = (schema: AnyZodObject) => validate(schema);

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("User not authenticated");

    const profile = await userService.getUserById(req.user.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = [
  validateSchema(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error("User not authenticated");

      const updatedUser = await userService.updateProfile(req.user.id, req.body);
      res.json({
        code: "PROFILE_UPDATED",
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },
];

export const changePassword = [
  validate(changePasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthenticatedRequest;

      const { ...passwordData } = req.body;

      await userService.changePassword(user.id, passwordData);
      res.json({ code: "PASSWORD_CHANGED", message: "Password changed successfully" });
    } catch (err) {
      next(err);
    }
  },
];

export const setInitialPassword = [
  validate(setInitialPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthenticatedRequest;
      const { user: updatedUser, token: newToken } = await userService.setInitialPassword(
        user.id,
        req.body,
      );

      res.json({
        code: "PASSWORD_SET",
        message: "Password set successfully",
        user: updatedUser,
        token: newToken, // ← Novo token com hasPassword:true
      });
    } catch (err) {
      next(err);
    }
  },
];
