import { Request, Response, NextFunction } from "express";
import * as service from "./userConsole.service";
import { UserConsoleInputSchema, UserConsoleUpdateSchema } from "./userConsole.schema";
import { validate } from "../../middleware/validate.middleware.ts";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      name: string;
      slug: string;
      email: string;
      profileImage: string | null;
      role: string;
      hasPassword: boolean;
    };
  }
}

export const createUserConsole = [
  validate(UserConsoleInputSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error("User not authenticated");

      const userConsole = await service.createUserConsole(req.user.id, req.body);

      res.status(201).json({
        code: "CONSOLE_ADDED",
        message: "Console added to your collection",
        userConsole,
      });
    } catch (err) {
      next(err);
    }
  },
];

export const listUserConsoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    const consoles = await service.getUserConsoles(req.user.id);
    res.json(consoles);
  } catch (err) {
    next(err);
  }
};

export const getUserConsole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    const id = parseInt(req.params.id, 10);
    const userConsole = await service.getUserConsoleById(id, req.user.id);
    res.json(userConsole);
  } catch (err) {
    next(err);
  }
};

export const updateUserConsole = [
  validate(UserConsoleUpdateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error("User not authenticated");
      const id = parseInt(req.params.id, 10);

      // Ajuste na chamada: adicionado userId como segundo parâmetro
      const userConsole = await service.updateUserConsole(id, req.user.id, req.body);

      res.json({
        code: "CONSOLE_UPDATED",
        message: "Console collection item updated",
        userConsole,
      });
    } catch (err) {
      next(err);
    }
  },
];

export const deleteUserConsole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    const id = parseInt(req.params.id, 10);
    await service.deleteUserConsole(id, req.user.id);
    res.json({
      code: "CONSOLE_REMOVED",
      message: "Console removed from your collection",
    });
  } catch (err) {
    next(err);
  }
};
