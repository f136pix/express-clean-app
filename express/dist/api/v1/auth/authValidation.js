"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = exports.authSignin = exports.authSignup = void 0;
const joi_1 = __importDefault(require("joi"));
// const PASSWORD_REGEX = new RegExp(
// );
exports.authSignup = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6)
    // password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});
exports.authSignin = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.roleSchema = joi_1.default.object().keys({
    role: joi_1.default.string().required(),
});
