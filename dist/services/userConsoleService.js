"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserConsoles = listUserConsoles;
exports.addUserConsole = addUserConsole;
const db_1 = require("../lib/db");
function listUserConsoles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.db.userConsole.findMany({
            where: { userId },
            include: { console: true, variant: true, skin: true },
        });
    });
}
function addUserConsole(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const variant = yield db_1.db.consoleVariant.findUnique({
            where: {
                consoleId_slug: { consoleId: data.consoleId, slug: data.variantSlug },
            },
        });
        if (!variant)
            throw new Error("Variant not found");
        let skinId;
        if (data.skinSlug) {
            const skin = yield db_1.db.skin.findUnique({
                where: { slug: data.skinSlug },
            });
            if (!skin)
                throw new Error("Skin not found");
            if (skin.consoleVariantId !== variant.id) {
                throw new Error("Skin não pertence a essa variante");
            }
            skinId = skin.id;
        }
        return db_1.db.userConsole.create({
            data: {
                userId,
                consoleId: data.consoleId,
                consoleVariantId: variant.id,
                skinId,
                customSkin: data.customSkin,
                note: data.note,
                photoUrl: data.photoUrl,
            },
        });
    });
}
