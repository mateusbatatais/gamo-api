// src/utils/errors.ts

export class AppError extends Error {
  public code: string;
  public statusCode: number;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
