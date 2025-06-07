// tests/controllers/userController.spec.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../../src/services/userService";
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
} from "../../src/controllers/userController";
import { AppError } from "../../src/utils/errors";
import { Role } from "@prisma/client";

// helper types
interface ReqWithUser extends Request {
  user: { id: number };
}
interface ReqWithBody<B> extends ReqWithUser {
  body: B;
}

describe("userController", () => {
  let res: Pick<Response, "status" | "json">;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
    next = jest.fn();
  });

  describe("getProfileController", () => {
    const req = { user: { id: 42 } } as ReqWithUser;

    it("returns profile on success", async () => {
      const fakeUser = {
        id: 42,
        name: "John",
        email: "john@example.com",
        description: null,
        role: Role.NORMAL,
      };
      jest.spyOn(userService, "getUserById").mockResolvedValue(fakeUser);

      await getProfileController(req, res as Response, next);

      expect(userService.getUserById).toHaveBeenCalledWith(42);
      expect(res.json).toHaveBeenCalledWith(fakeUser);
      expect(statusMock).not.toHaveBeenCalled();
    });

    it("handles AppError", async () => {
      const error = new AppError(404, "USER_NOT_FOUND", "not found");
      jest.spyOn(userService, "getUserById").mockRejectedValue(error);

      await getProfileController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ code: "USER_NOT_FOUND", message: "not found" });
      expect(next).not.toHaveBeenCalled();
    });

    it("passes unknown error to next", async () => {
      const error = new Error("oops");
      jest.spyOn(userService, "getUserById").mockRejectedValue(error);

      await getProfileController(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateProfileController", () => {
    const baseReq = { user: { id: 42 } } as ReqWithUser;

    it("updates profile on success", async () => {
      const body = { name: "Jane", email: "jane@x.com", description: "bio" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      const updated = {
        id: 42,
        name: body.name,
        email: body.email,
        description: body.description,
        role: Role.NORMAL,
      };
      jest.spyOn(userService, "updateProfile").mockResolvedValue(updated);

      await updateProfileController(req, res as Response, next);

      expect(userService.updateProfile).toHaveBeenCalledWith({
        userId: 42,
        name: body.name,
        email: body.email,
        description: body.description,
      });
      expect(res.json).toHaveBeenCalledWith({
        code: "PROFILE_UPDATED",
        message: "Perfil atualizado com sucesso.",
        user: updated,
      });
    });

    it("throws MISSING_FIELDS on missing inputs", async () => {
      const body = { name: "", email: "", description: "" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;

      await updateProfileController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        code: "MISSING_FIELDS",
        message: "Campos 'name' e 'email' são obrigatórios",
      });
    });

    it("handles AppError from service", async () => {
      const body = { name: "A", email: "a@b", description: null };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      const error = new AppError(400, "EMAIL_IN_USE", "in use");
      jest.spyOn(userService, "updateProfile").mockRejectedValue(error);

      await updateProfileController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ code: "EMAIL_IN_USE", message: "in use" });
    });

    it("forwards unknown error", async () => {
      const body = { name: "X", email: "x@y", description: null };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      const error = new Error("fail");
      jest.spyOn(userService, "updateProfile").mockRejectedValue(error);

      await updateProfileController(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("changePasswordController", () => {
    const baseReq = { user: { id: 42 } } as ReqWithUser;

    it("changes password on success", async () => {
      const body = { currentPassword: "o", newPassword: "n", confirmNewPassword: "n" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      jest.spyOn(userService, "changePassword").mockResolvedValue(undefined);

      await changePasswordController(req, res as Response, next);

      expect(userService.changePassword).toHaveBeenCalledWith({
        userId: 42,
        currentPassword: "o",
        newPassword: "n",
      });
      expect(res.json).toHaveBeenCalledWith({
        code: "PASSWORD_CHANGED",
        message: "Senha alterada com sucesso.",
      });
    });

    it("throws MISSING_FIELDS on missing", async () => {
      const body = { currentPassword: "", newPassword: "n", confirmNewPassword: "n" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;

      await changePasswordController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        code: "MISSING_FIELDS",
        message: "É necessário informar 'currentPassword', 'newPassword' e 'confirmNewPassword'",
      });
    });

    it("throws PASSWORDS_DO_NOT_MATCH on mismatch", async () => {
      const body = { currentPassword: "o", newPassword: "a", confirmNewPassword: "b" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;

      await changePasswordController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        code: "PASSWORDS_DO_NOT_MATCH",
        message: "As novas senhas não coincidem",
      });
    });

    it("handles AppError from service", async () => {
      const body = { currentPassword: "o", newPassword: "n", confirmNewPassword: "n" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      const error = new AppError(401, "INVALID_CREDENTIALS", "wrong");
      jest.spyOn(userService, "changePassword").mockRejectedValue(error);

      await changePasswordController(req, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ code: "INVALID_CREDENTIALS", message: "wrong" });
    });

    it("forwards unknown error", async () => {
      const body = { currentPassword: "x", newPassword: "y", confirmNewPassword: "y" };
      const req = { ...baseReq, body } as ReqWithBody<typeof body>;
      const error = new Error("err");
      jest.spyOn(userService, "changePassword").mockRejectedValue(error);

      await changePasswordController(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
