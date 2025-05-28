"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserConsoleSchema = void 0;
const zod_1 = require("zod");
exports.createUserConsoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        consoleId: zod_1.z.number(),
        variantSlug: zod_1.z.string(),
        skinSlug: zod_1.z.string().nullable().optional(),
        customSkin: zod_1.z.string().optional(),
        note: zod_1.z.string().optional(),
        photoUrl: zod_1.z.string().url().optional(),
    }),
});
