"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'ValidationError',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
