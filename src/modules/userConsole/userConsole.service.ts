import * as repository from "./userConsole.repository";
import { UserConsoleInput, UserConsoleUpdate } from "./userConsole.schema";
import { AppError } from "../../shared/errors";
import { Prisma } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { db } from "../../core/db";

export const createUserConsole = async (userId: number, input: UserConsoleInput) => {
  const consoleExists = await db.console.findUnique({
    where: { id: input.consoleId },
  });
  if (!consoleExists) {
    throw new AppError(404, "CONSOLE_NOT_FOUND", "Console not found");
  }

  const variantExists = await db.consoleVariant.findUnique({
    where: { id: input.consoleVariantId },
  });
  if (!variantExists) {
    throw new AppError(404, "VARIANT_NOT_FOUND", "Variant not found");
  }

  if (input.skinId) {
    const skinExists = await db.skin.findUnique({
      where: { id: input.skinId },
    });
    if (!skinExists) {
      throw new AppError(404, "SKIN_NOT_FOUND", "Skin not found");
    }
  }

  // Corrigido: Adicionar o usuário na criação
  const data: Prisma.UserConsoleCreateInput = {
    user: { connect: { id: userId } }, // Adicionado aqui
    console: { connect: { id: input.consoleId } },
    variant: { connect: { id: input.consoleVariantId } },
    skin: input.skinId ? { connect: { id: input.skinId } } : undefined,
    customSkin: input.customSkin,
    description: input.description,
    status: input.status as $Enums.ConsoleStatus,
    price: input.price,
    hasBox: input.hasBox,
    hasManual: input.hasManual,
    condition: input.condition as $Enums.ItemCondition | undefined,
    acceptsTrade: input.acceptsTrade,
    photoMain: input.photoMain,
    photos: input.photos,
  };

  return repository.createUserConsole(data);
};

export const updateUserConsole = async (id: number, userId: number, input: UserConsoleUpdate) => {
  const existing = await repository.getUserConsoleById(id, userId);
  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Console collection item not found");
  }

  if (input.skinId) {
    const skinExists = await db.skin.findUnique({
      where: { id: input.skinId },
    });
    if (!skinExists) {
      throw new AppError(404, "SKIN_NOT_FOUND", "Skin not found");
    }
  }

  const data: Prisma.UserConsoleUpdateInput = {
    console: input.consoleId ? { connect: { id: input.consoleId } } : undefined,
    variant: input.consoleVariantId ? { connect: { id: input.consoleVariantId } } : undefined,
    skin: input.skinId ? { connect: { id: input.skinId } } : undefined,
    customSkin: input.customSkin,
    description: input.description,
    status: input.status as $Enums.ConsoleStatus | undefined,
    price: input.price,
    hasBox: input.hasBox,
    hasManual: input.hasManual,
    condition: input.condition as $Enums.ItemCondition | undefined,
    acceptsTrade: input.acceptsTrade,
    photoMain: input.photoMain,
    photos: input.photos,
  };

  return repository.updateUserConsole(id, data);
};

export const deleteUserConsole = async (id: number, userId: number) => {
  const existing = await repository.getUserConsoleById(id, userId);
  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Console collection item not found");
  }
  return repository.deleteUserConsole(id);
};

export const getUserConsoleById = async (id: number, userId: number) => {
  const item = await repository.getUserConsoleById(id, userId);
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Console collection item not found");
  }
  return item;
};

export const getUserConsoles = async (userId: number) => {
  return repository.getUserConsoles(userId);
};
