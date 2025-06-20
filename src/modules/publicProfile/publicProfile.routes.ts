import { Router } from "express";
import { getPublicProfile, listUserConsoles, listUserGames } from "./publicProfile.controller";

const router = Router();

// Endpoints públicos
router.get("/:slug", getPublicProfile);
router.get("/:slug/consoles", listUserConsoles);
router.get("/:slug/games", listUserGames);

export default router;
