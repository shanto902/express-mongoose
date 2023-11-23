"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'FirstName is required' })
        .min(1)
        .max(255),
    lastName: zod_1.z
        .string({ required_error: 'LastName is required' })
        .min(1)
        .max(255),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'Street is required' }).min(1).max(255),
    city: zod_1.z.string({ required_error: 'City is required' }).min(1).max(255),
    country: zod_1.z.string({ required_error: 'Country is required' }).min(1).max(255),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1).max(255),
    password: zod_1.z.string().min(1).max(255),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: addressValidationSchema,
});
exports.default = userValidationSchema;
