// tests/validators/consoleVariantsValidator.test.ts
import { listConsoleVariantsSchema } from "../../../src/validators/listConsoleVariants";
import { z } from "zod";

describe("Console Variants Validation", () => {
  it("should validate valid query parameters", () => {
    const validQuery = { page: "1", perPage: "20", locale: "pt" };
    expect(() => listConsoleVariantsSchema.parse({ query: validQuery })).not.toThrow();
  });

  it("should throw an error for invalid page", () => {
    const invalidQuery = { page: "-1", perPage: "20", locale: "pt" };
    expect(() => listConsoleVariantsSchema.parse({ query: invalidQuery })).toThrowError(z.ZodError);
  });

  it("should throw an error for invalid perPage", () => {
    const invalidQuery = { page: "1", perPage: "-10", locale: "pt" };
    expect(() => listConsoleVariantsSchema.parse({ query: invalidQuery })).toThrowError(z.ZodError);
  });

  it("should throw an error if locale is missing", () => {
    const invalidQuery = { page: "1", perPage: "20" };
    expect(() => listConsoleVariantsSchema.parse({ query: invalidQuery })).toThrowError(z.ZodError);
  });
});
