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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const prismaClient_1 = __importDefault(require("../../../../prismaClient"));
const UnauthorizedError_1 = require("../exceptions/UnauthorizedError");
const jwtService_1 = __importDefault(require("../services/jwtService"));
const checkPermission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throw new UnauthorizedError_1.UnauthorizedError('Missing or invalid authorization header');
            }
            const token = authHeader.split(' ')[1];
            const decoded = jwtService_1.default.decode(token);
            if (!decoded) {
                throw new UnauthorizedError_1.UnauthorizedError('Missing or invalid authorization header');
            }
            const userRole = (decoded === null || decoded === void 0 ? void 0 : decoded.role) ? decoded === null || decoded === void 0 ? void 0 : decoded.role : 'anonymous';
            const userPermissions = yield ((_a = prismaClient_1.default.role.findUnique({
                where: {
                    name: userRole,
                },
            })) === null || _a === void 0 ? void 0 : _a.permissions().then((permissions) => permissions === null || permissions === void 0 ? void 0 : permissions.map((permission) => permission.name)));
            console.log("Permission.ts " + permission);
            console.log("User pemissions " + userPermissions);
            if (userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.includes(permission)) {
                return next();
            }
            else {
                throw new UnauthorizedError_1.UnauthorizedError('User does not have access to this resource');
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.checkPermission = checkPermission;
