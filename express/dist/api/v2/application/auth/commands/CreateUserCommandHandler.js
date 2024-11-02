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
const UserCreated_1 = require("../../../domain/UserAggregate/Events/UserCreated");
const User_1 = require("../../../domain/UserAggregate/User");
const Conflict_1 = require("../../../infraestructure/_common/exceptions/defaultModels/Conflict");
const Success_1 = require("../../../infraestructure/_common/exceptions/defaultModels/Success");
const InMemoryEventBus_1 = __importDefault(require("../../../infraestructure/_common/models/InMemoryEventBus"));
const RolesRepository_1 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/RolesRepository"));
const RolesRepository_2 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/RolesRepository"));
const UserRepository_1 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/UserRepository"));
const UserRepository_2 = __importDefault(require("../../../infraestructure/_common/persistance/repositories/UserRepository"));
class CreateUserCommandHandler {
    constructor() {
        this.userRepository = UserRepository_1.default;
        this.roleRepository = RolesRepository_1.default;
        this.eventBus = (0, InMemoryEventBus_1.default)();
    }
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield RolesRepository_2.default.findRoleById(1);
            const userExists = yield UserRepository_2.default.findByEmailAsync(data.email);
            if (userExists) {
                return new Conflict_1.Conflict("User with this Email is already registered");
            }
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
            const user = User_1.User.create(data.email, data.email, hashedPassword, role);
            yield this.userRepository.addAsync(user);
            const userCreatedEvent = new UserCreated_1.UserCreatedDomainEvent(user.id.getValue(), user.name, user.email);
            const jwt = jwtService_1.default.sign({ id: user.id, role: role === null || role === void 0 ? void 0 : role.name }, '1h');
            const returnData = {
                user: user,
                jwt: jwt
            };
            yield this.eventBus.publish([userCreatedEvent]);
            return new Success_1.Success(returnData);
        });
    }
}
exports.default = new CreateUserCommandHandler();
