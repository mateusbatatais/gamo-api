import { Request, Response } from "express";

export const mockRequest = (overrides: Partial<Request> = {}) =>
  ({
    query: {},
    params: {},
    body: {},
    ...overrides,
  }) as Request;

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

export const mockNext = jest.fn();
