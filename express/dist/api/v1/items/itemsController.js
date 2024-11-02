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
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../_common/middlewares/asyncHandler"));
const rbacMiddleware_1 = require("../_common/middlewares/rbacMiddleware");
const schemaValidator_1 = __importDefault(require("../_common/middlewares/schemaValidator"));
const itemsService_1 = __importDefault(require("./itemsService"));
const itemsService_2 = __importDefault(require("./itemsService"));
const itemsValidation_1 = require("./itemsValidation");
const itemsController = (0, express_1.Router)();
itemsController.get('/', (0, rbacMiddleware_1.checkPermission)('get:items'), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield itemsService_1.default.get();
    const response = {
        message: "Items retrieved",
        data: ret
    };
    res.json(response);
})));
itemsController.post('/', (0, rbacMiddleware_1.checkPermission)('create:items'), (0, schemaValidator_1.default)(itemsValidation_1.createItemSchema), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield itemsService_2.default.create(req.body);
    const response = {
        message: 'Item created successfully',
        data: ret
    };
    res.json(response);
})));
itemsController.delete('/:id', (0, rbacMiddleware_1.checkPermission)('delete:items'), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield itemsService_2.default.delete(Number(req.params.id));
    const response = {
        message: 'Item deleted successfully',
        data: ret
    };
    res.json(response);
})));
itemsController.put('/:id', (0, rbacMiddleware_1.checkPermission)('update:items'), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield itemsService_2.default.update(Number(req.params.id), req.body);
    const response = {
        message: 'Item updated successfully',
        data: ret
    };
    res.json(response);
})));
exports.default = itemsController;
