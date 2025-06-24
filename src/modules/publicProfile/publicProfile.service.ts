import * as repository from "./publicProfile.repository";
import { PublicUserProfile, UserConsolePublic, UserGamePublic } from "./publicProfile.schema";
import { AppError } from "../../shared/errors";

export const getPublicUserProfile = async (slug: string): Promise<PublicUserProfile> => {
  const user = await repository.getUserBySlug(slug);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "User not found");
  }
  return user;
};

export const listUserConsolesPublic = async (
  slug: string,
  locale: string = "pt",
): Promise<UserConsolePublic[]> => {
  try {
    const user = await repository.getUserBySlug(slug);
    if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found");
    return repository.getUserConsolesPublic(user.id, locale);
  } catch {
    throw new AppError(500, "SERVER_ERROR", "Error fetching user consoles");
  }
};

export const listUserGamesPublic = async (slug: string): Promise<UserGamePublic[]> => {
  const user = await repository.getUserBySlug(slug);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "User not found");
  }
  return repository.getUserGamesPublic(user.id);
};
