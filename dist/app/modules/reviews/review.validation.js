"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const addReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        author: zod_1.z.string({ required_error: 'Author is required' }),
        body: zod_1.z.string({ required_error: 'Body is required' }),
        rating: zod_1.z.number({ required_error: 'Rating is required' }),
        book: zod_1.z.string({
            required_error: 'Book is required',
        }),
    }),
});
exports.ReviewValidation = {
    addReviewZodSchema,
};
