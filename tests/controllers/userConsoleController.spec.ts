import { Request, Response, NextFunction } from "express";
import httpMocks from "node-mocks-http";
import * as userService from "../../src/services/userService";
import { AppError } from "../../src/utils/errors";
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
} from "../../src/controllers/userController";
import { MockResponse, MockRequest } from "node-mocks-http";

// Mock the userService module
jest.mock("../../src/services/userService");
const mockedUserService = userService as jest.Mocked<typeof userService>;

// Mock the validators to bypass Zod schema in controllers
jest.mock("../../src/validators/user", () => ({
  createUserProfileSchema: {
    safeParse: jest.fn((data: unknown) => ({ success: true, data })),
  },
  createChangePasswordSchema: {
    safeParse: jest.fn((data: unknown) => ({ success: true, data })),
  },
}));

type RequestWithUser = Request & { user: { id: number } };

describe("getProfileController", () => {
  let req: MockRequest<RequestWithUser>;
  let res: MockResponse<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest<RequestWithUser>({
      method: "GET",
      url: "/profile",
      user: { id: 42 },
    });
    res = httpMocks.createResponse<Response>();
    jest.spyOn(res, "json");
    jest.spyOn(res, "status");
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user profile and return JSON", async () => {
    const fakeUser = {
      id: 42,
      name: "Test User",
      email: "test@example.com",
      description: "Desc",
      role: "user",
      profileImage: null,
    };
    mockedUserService.getUserById.mockResolvedValue(fakeUser);

    await getProfileController(req, res, next);

    expect(mockedUserService.getUserById).toHaveBeenCalledWith(42);
    expect(res.json).toHaveBeenCalledWith(fakeUser);
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle AppError and respond with status & error JSON", async () => {
    const error = new AppError(404, "NOT_FOUND", "User not found");
    mockedUserService.getUserById.mockRejectedValue(error);

    await getProfileController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ code: "NOT_FOUND", message: "User not found" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next on unexpected error", async () => {
    const unexpected = new Error("DB down");
    mockedUserService.getUserById.mockRejectedValue(unexpected);

    await getProfileController(req, res, next);

    expect(next).toHaveBeenCalledWith(unexpected);
  });
});

describe("updateProfileController", () => {
  let req: MockRequest<RequestWithUser>;
  let res: MockResponse<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest<RequestWithUser>({
      method: "PUT",
      url: "/profile",
      user: { id: 42 },
      body: {},
    });
    res = httpMocks.createResponse<Response>();
    jest.spyOn(res, "json");
    jest.spyOn(res, "status");
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update profile with valid data", async () => {
    req.body = { name: "Jane", email: "jane@test.com", description: "Hi", profileImage: "img.png" };
    const updatedUser = { id: 42, ...req.body };
    mockedUserService.updateProfile.mockResolvedValue(updatedUser);

    await updateProfileController(req, res, next);

    expect(mockedUserService.updateProfile).toHaveBeenCalledWith({
      userId: 42,
      name: "Jane",
      email: "jane@test.com",
      description: "Hi",
      profileImage: "img.png",
    });
    expect(res.json).toHaveBeenCalledWith({
      code: "PROFILE_UPDATED",
      message: "Perfil atualizado com sucesso.",
      user: updatedUser,
    });
  });

  it("should return 400 on invalid input after schema mock failure", async () => {
    const { createUserProfileSchema } = require("../../src/validators/user");
    (createUserProfileSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: { errors: [{ message: "Invalid" }] },
    });
    req.body = { email: "bad" };

    await updateProfileController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ code: "INVALID_INPUT", message: "Invalid" });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("changePasswordController", () => {
  let req: MockRequest<RequestWithUser>;
  let res: MockResponse<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest<RequestWithUser>({
      method: "POST",
      url: "/change-password",
      user: { id: 42 },
      body: {},
    });
    res = httpMocks.createResponse<Response>();
    jest.spyOn(res, "json");
    jest.spyOn(res, "status");
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should change password with matching new passwords", async () => {
    req.body = {
      currentPassword: "oldPass",
      newPassword: "newPass",
      confirmNewPassword: "newPass",
    };
    mockedUserService.changePassword.mockResolvedValue();

    await changePasswordController(req, res, next);

    expect(mockedUserService.changePassword).toHaveBeenCalledWith({
      userId: 42,
      currentPassword: "oldPass",
      newPassword: "newPass",
    });
    expect(res.json).toHaveBeenCalledWith({
      code: "PASSWORD_CHANGED",
      message: "Senha alterada com sucesso.",
    });
  });

  it("should return 400 when new passwords do not match after schema mock success", async () => {
    req.body = { currentPassword: "oldPass", newPassword: "a", confirmNewPassword: "b" };
    await changePasswordController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: "PASSWORDS_DO_NOT_MATCH",
      message: "As novas senhas não coincidem",
    });
  });

  it("should return 400 on invalid input schema", async () => {
    const { createChangePasswordSchema } = require("../../src/validators/user");
    (createChangePasswordSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: { errors: [{ message: "InvalidPass" }] },
    });
    req.body = { foo: "bar" };

    await changePasswordController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ code: "INVALID_INPUT", message: "InvalidPass" });
    expect(next).not.toHaveBeenCalled();
  });
});
