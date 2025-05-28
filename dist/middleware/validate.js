"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (err) {
        res.status(400).json({
            error: "Validação falhou",
            details: err.errors,
        });
        return;
    }
};
exports.validate = validate;
