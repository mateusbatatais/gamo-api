import { listConsoleVariants, ListConsoleVariantsOptions } from "../repositories/consoleRepository";

export const getConsoleVariants = async (options: ListConsoleVariantsOptions) => {
  return listConsoleVariants(options);
};
