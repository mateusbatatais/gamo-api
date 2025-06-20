import { Request, Response, NextFunction } from "express";
import * as service from "./publicProfile.service";

export const getPublicProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const profile = await service.getPublicUserProfile(slug);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const listUserConsoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const consoles = await service.listUserConsolesPublic(slug);
    res.json(consoles);
  } catch (err) {
    next(err);
  }
};

export const listUserGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const games = await service.listUserGamesPublic(slug);
    res.json(games);
  } catch (err) {
    next(err);
  }
};
