// tests/controllers/userConsoleController.spec.ts
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import userConsolesRouter from "../../src/routes/userConsoles";

// Mock do middleware com tipagens corretas
jest.mock("../../src/middleware/auth", () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = { id: 42 };
    next();
  },
}));

const app = express();
app.use(express.json());
app.use("/api/user/consoles", require("../../src/routes/userConsoles").default);

describe("UserConsoleController", () => {
  it("GET / → 200 com array", async () => {
    const res = await request(app).get("/api/user/consoles");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
