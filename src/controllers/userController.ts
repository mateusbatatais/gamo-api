// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { AppError } from "../utils/errors";

interface RequestWithUser extends Request {
  user: { id: number };
}

export async function getProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const found = await userService.getUserById(user.id);
    res.json(found);
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}

export async function updateProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const { name, email, description, profileImage } = req.body as {
      name?: string;
      email?: string;
      description?: string;
      profileImage?: string;
    };

    if (!name || !email) {
      throw new AppError(400, "MISSING_FIELDS", "Campos 'name' e 'email' são obrigatórios");
    }

    const updatedUser = await userService.updateProfile({
      userId: user.id,
      name,
      email,
      description: description ?? null,
      profileImage,
    });

    res.json({
      code: "PROFILE_UPDATED",
      message: "Perfil atualizado com sucesso.",
      user: updatedUser,
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}

export async function changePasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { user } = req as RequestWithUser;
    const { currentPassword, newPassword, confirmNewPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
      confirmNewPassword?: string;
    };

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
      userId: user.id,
      currentPassword,
      newPassword,
    });

    res.json({ code: "PASSWORD_CHANGED", message: "Senha alterada com sucesso." });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}
