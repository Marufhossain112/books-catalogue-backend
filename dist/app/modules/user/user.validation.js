"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const common_1 = require("../../../shared/common");
const signUpUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            middleName: zod_1.z
                .string({
                required_error: 'Middle name is required',
            })
                .optional(),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        gender: zod_1.z.enum([...common_1.gender], {
            required_error: 'Gender is required.',
        }),
        bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact number is required.',
        })
            .optional(),
        presentAddress: zod_1.z.string({
            required_error: 'Present address is required.',
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    signUpUserZodSchema,
};
