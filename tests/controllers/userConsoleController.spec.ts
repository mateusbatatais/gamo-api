// tests/controllers/userConsoleController.spec.ts
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";

// Define a custom type for the request with a 'user' property
interface RequestWithUser extends Request {
  user?: { id: number };
}

// Mock do middleware com tipagens corretas
jest.mock("../../src/middleware/auth", () => ({
  authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.user = { id: 42 };
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
