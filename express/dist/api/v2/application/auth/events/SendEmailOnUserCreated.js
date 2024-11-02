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
exports.SendEmailOnUserCreated = void 0;
const UserCreated_1 = require("../../../domain/UserAggregate/Events/UserCreated");
const RabbitMqEventPublisher_1 = __importDefault(require("../../../infraestructure/_common/models/RabbitMqEventPublisher"));
class SendEmailOnUserCreated {
    constructor() {
        this.publisher = RabbitMqEventPublisher_1.default;
    }
    subscribedTo() {
        return [UserCreated_1.UserCreatedDomainEvent];
    }
    on(domainEventPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, email } = domainEventPayload;
            // Pass the information to the broker so emailSenderService uses it
            const sendEmailEvent = {
                name: name,
                email: email
            };
            yield this.publisher.publishAsync(sendEmailEvent, "send.email");
            return Promise.resolve();
        });
    }
}
exports.SendEmailOnUserCreated = SendEmailOnUserCreated;
