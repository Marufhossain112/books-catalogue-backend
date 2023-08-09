"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// cors user
app.use((0, cors_1.default)());
// cookie parser
app.use((0, cookie_parser_1.default)());
// parser user
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1', routes_1.default);
// globalErrorHandler
app.use(globalErrorHandler_1.default);
// handle not found routes
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'not found',
        errorMessages: [
            {
                path: req.url,
                message: 'Not found api',
            },
        ],
    });
    next();
});
exports.default = app;
