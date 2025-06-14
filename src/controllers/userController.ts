// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { AppError } from "../shared/errors";
import { createUserProfileSchema, createChangePasswordSchema } from "../validators/user"; // Ajuste para o novo arquivo de validação

interface RequestWithUser extends Request {
  user: { id: number; role: string; email: string };
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
    const validatedData = createUserProfileSchema.safeParse(req.body);
    if (!validatedData.success) {
      throw new AppError(
        400,
        "INVALID_INPUT",
        validatedData.error.errors.map((e) => e.message).join(", "),
      );
    }

    const { name, email, description, profileImage } = validatedData.data;

    const updatedUser = await userService.updateProfile({
      userId: user.id,
      name,
      email,
      description,
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

    // Validando os dados de entrada com zod
    const validatedData = createChangePasswordSchema.safeParse(req.body);
    if (!validatedData.success) {
      throw new AppError(
        400,
        "INVALID_INPUT",
        validatedData.error.errors.map((e) => e.message).join(", "),
      );
    }

    const { currentPassword, newPassword, confirmNewPassword } = validatedData.data;

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
