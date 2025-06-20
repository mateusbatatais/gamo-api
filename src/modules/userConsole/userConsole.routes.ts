import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createUserConsole,
  updateUserConsole,
  deleteUserConsole,
  getUserConsole,
  listUserConsoles,
} from "./userConsole.controller";

const router = Router();

router.post("/", authMiddleware, createUserConsole);
router.get("/", authMiddleware, listUserConsoles);
router.get("/:id", authMiddleware, getUserConsole);
router.put("/:id", authMiddleware, updateUserConsole);
router.delete("/:id", authMiddleware, deleteUserConsole);

export default router;
