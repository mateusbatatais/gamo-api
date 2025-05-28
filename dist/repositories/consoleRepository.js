"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVariantBySlug = void 0;
const db_1 = require("../lib/db");
const findVariantBySlug = (consoleId, slug) => db_1.db.consoleVariant.findUnique({
    where: { consoleId_slug: { consoleId, slug } },
});
exports.findVariantBySlug = findVariantBySlug;
