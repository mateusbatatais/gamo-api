// src/controllers/userController.ts

import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { AppError } from "../utils/errors";

// Interface para tipar req.user (injetado pelo authMiddleware)
interface RequestWithUser extends Request {
  user: {
    id: number;
  };
}

/**
 * GET /api/user/profile
 */
export async function getProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const userId = user.id;

    const found = await userService.getUserById(userId);
    res.json(found);
    return;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        code: err.code,
        message: err.message,
      });
      return;
    }
    next(err);
  }
}

/**
 * PUT /api/user/profile
 */
export async function updateProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const userId = user.id;

    const { name, email, description } = req.body as {
      name?: string;
      email?: string;
      description?: string;
    };

    // Validação básica
    if (!name || !email) {
      throw new AppError(400, "MISSING_FIELDS", "Campos 'name' e 'email' são obrigatórios");
    }

    const updatedUser = await userService.updateProfile({
      userId,
      name,
      email,
      description: description ?? null,
    });

    res.json({
      code: "PROFILE_UPDATED",
      message: "Perfil atualizado com sucesso.",
      user: updatedUser,
    });
    return;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        code: err.code,
        message: err.message,
      });
      return;
    }
    next(err);
  }
}

/**
 * PUT /api/user/profile/password
 */
export async function changePasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const userId = user.id;

    const { currentPassword, newPassword, confirmNewPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
      confirmNewPassword?: string;
    };

    // Validações básicas
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new AppError(
        400,
        "MISSING_FIELDS",
        "É necessário informar 'currentPassword', 'newPassword' e 'confirmNewPassword'",
      );
    }
    if (newPassword !== confirmNewPassword) {
      throw new AppError(400, "PASSWORDS_DO_NOT_MATCH", "As novas senhas não coincidem");
    }

    await userService.changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    res.json({
      code: "PASSWORD_CHANGED",
      message: "Senha alterada com sucesso.",
    });
    return;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        code: err.code,
        message: err.message,
      });
      return;
    }
    next(err);
  }
}
