"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const typescript_1 = require("typescript");
const v1_1 = __importDefault(require("./api/v1"));
const v2_1 = __importDefault(require("./api/v2"));
const terminate_1 = __importDefault(require("./terminate"));
const exitHandler = (0, terminate_1.default)(typescript_1.server, {
    coredump: false,
    timeout: 500
});
process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
// process.on('SIGINT', exitHandler(0, 'SIGINT'))
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = 5000;
app.use('/api/v1', v1_1.default);
app.use('/api/v2', v2_1.default);
app.use('/health', (req, res) => {
    res.status(200).json({ message: 'App is running' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
