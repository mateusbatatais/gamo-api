// src/routes/userProfile.ts

import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth";
import * as userService from "../services/userService";
import { AppError } from "../utils/errors";

const router = Router();

// Interface para tipar req.user (injetado pelo authMiddleware)
interface RequestWithUser extends Request {
  user: {
    id: number;
  };
}

/**
 * GET /api/user/profile
 * Retorna os dados públicos do usuário autenticado (id, name, email, role, description).
 */
router.get(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req as RequestWithUser;
      const userId = user.id;

      // Busca o usuário no banco (via service)
      const found = await userService.getUserById(userId);
      // Retornamos exatamente os campos públicos definidos em getUserById
      res.json(found);
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
  },
);

/**
 * PUT /api/user/profile
 * Atualiza name, email e description do usuário autenticado.
 * Body esperado: { name: string, email: string, description?: string }
 */
router.put(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req as RequestWithUser;
      const userId = user.id;
      const { name, email, description } = req.body as {
        name?: string;
        email?: string;
        description?: string;
      };

      // Validação básica dos campos obrigatórios
      if (!name || !email) {
        throw new AppError(400, "MISSING_FIELDS", "Campos 'name' e 'email' são obrigatórios");
      }

      // Atualiza via service
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
  },
);

/**
 * PUT /api/user/profile/password
 * Altera a senha do usuário autenticado.
 * Body esperado: { currentPassword: string, newPassword: string, confirmNewPassword: string }
 */
router.put(
  "/profile/password",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      // Chama service para trocar senha
      await userService.changePassword({
        userId,
        currentPassword,
        newPassword,
      });

      res.json({
        code: "PASSWORD_CHANGED",
        message: "Senha alterada com sucesso.",
      });
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
  },
);

export default router;
