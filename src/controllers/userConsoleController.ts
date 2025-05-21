import { Request, Response } from "express";
import * as userConsoleService from "../services/userConsoleService";

export async function listUserConsoles(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const consoles = await userConsoleService.listUserConsoles(userId);
  return res.json(consoles);
}

export async function createUserConsole(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const data = req.body;
  const result = await userConsoleService.addUserConsole(userId, data);
  return res.status(201).json(result);
}
