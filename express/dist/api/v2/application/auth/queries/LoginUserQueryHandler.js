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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtService_1 = __importDefault(require("../../../../v1/_common/services/jwtService"));
const NotFound_1 = require("../../../infraestructure/_common/exceptions/defaultModels/NotFound");
const Success_1 = require("../../../infraestructure/_common/exceptions/defaultModels/Success");
const Unauthorized_1 = require("../../../infraestructure/_common/exceptions/defaultModels/Unauthorized");
const RolesRepository_1 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/RolesRepository"));
const UserRepository_1 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/UserRepository"));
class LoginUserQueryHandler {
    constructor() {
        this.userRepository = UserRepository_1.default;
        this.roleRepository = RolesRepository_1.default;
    }
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield this.userRepository.findByEmailAsync(data.email);
            if (!user) {
                return new NotFound_1.NotFound("There is no user with this email");
            }
            const isValidPassword = yield bcrypt_1.default.compare(data.password, user.password);
            if (!isValidPassword) {
                return new Unauthorized_1.Unauthorized('Invalid password');
            }
            const jwt = jwtService_1.default.sign({ id: user.id, role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.name }, '1h');
            const returnData = {
                user: user,
                jwt: jwt
            };
            return new Success_1.Success(returnData);
        });
    }
}
exports.default = new LoginUserQueryHandler();
