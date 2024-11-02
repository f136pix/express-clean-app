"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class jwtService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'secret';
    }
    sign(payload, expiresIn) {
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn });
    }
    verify(token) {
        try {
            jsonwebtoken_1.default.verify(token, this.secret);
            return true;
        }
        catch (error) {
            // throw new Error('Invalid token');
            return false;
        }
    }
    decode(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret);
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = new jwtService();
