import { listConsoleVariants } from "../../../src/controllers/console.controller";
import { getConsoleVariants } from "../../../src/services/console.service";
import { createMockRequest, createMockResponse, createMockNext } from "../../utils/test-utils";

jest.mock("../../../src/services/console.service");

describe("Console Controller", () => {
  it("deve retornar 200 com dados válidos", async () => {
    const req = createMockRequest({
      query: {
        locale: "pt",
        page: "1",
        perPage: "20",
      },
    });

    const res = createMockResponse();
    const next = createMockNext();

    (getConsoleVariants as jest.Mock).mockResolvedValue({
      items: [{ id: 1, name: "PlayStation 5" }],
      meta: { total: 1, page: 1, perPage: 20, totalPages: 1 },
    });

    await listConsoleVariants(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expect.any(Array),
      }),
    );
  });
});
