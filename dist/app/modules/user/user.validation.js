"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const common_1 = require("../../../shared/common");
const signUpUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        name: zod_1.z.string({
            required_error: 'Name is required.',
        }),
        gender: zod_1.z.enum([...common_1.gender], {
            required_error: 'Gender is required.',
        }),
        bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        contactNo: zod_1.z.string({
            required_error: 'Contact number is required.',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present address is required.',
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    signUpUserZodSchema,
};
