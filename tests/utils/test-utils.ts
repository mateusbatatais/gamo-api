import { Request, Response, NextFunction } from "express";

// Cria um mock completo de Request
export const createMockRequest = (overrides: Partial<Request> = {}): Request =>
  ({
    // Propriedades básicas
    params: {},
    query: {},
    body: {},
    headers: {},
    cookies: {},
    // Métodos comuns (implementação mínima)
    get: jest.fn(),
    header: jest.fn(),
    accepts: jest.fn(),
    acceptsCharsets: jest.fn(),
    // ... adicione outras propriedades conforme necessário
    ...overrides,
  }) as unknown as Request; // Cast necessário para satisfazer a interface

// Cria um mock completo de Response
export const createMockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.getHeader = jest.fn();
  // ... adicione outras propriedades conforme necessário
  return res as Response;
};

// Cria um mock de NextFunction
export const createMockNext = (): NextFunction => jest.fn();
