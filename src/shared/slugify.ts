// src/shared/utils/slugify.ts
import * as userRepository from "../modules/user/user.repository";

export async function generateUniqueSlug(base: string): Promise<string> {
  const candidate = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Usar o repository em vez de acesso direto
  const exists = await userRepository.checkSlugAvailability(candidate);

  if (!exists) return candidate;

  let counter = 1;
  while (true) {
    const newCandidate = `${candidate}-${counter}`;
    const exists = await userRepository.checkSlugAvailability(newCandidate);
    if (!exists) return newCandidate;
    counter++;
  }
}
