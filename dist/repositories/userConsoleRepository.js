"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserConsoles = exports.createUserConsole = void 0;
const db_1 = require("../lib/db");
const createUserConsole = (data) => {
    return db_1.db.userConsole.create({
        data,
        include: {
            console: true,
            variant: true,
            skin: true,
        },
    });
};
exports.createUserConsole = createUserConsole;
const listUserConsoles = (userId) => {
    return db_1.db.userConsole.findMany({
        where: { userId },
        include: {
            console: true,
            variant: true,
            skin: true,
        },
    });
};
exports.listUserConsoles = listUserConsoles;
