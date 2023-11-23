"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
});
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String },
    city: { type: String },
    country: { type: String },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: userNameSchema,
    age: { type: Number },
    email: { type: String },
    isActive: { type: Boolean },
    hobbies: [{ type: String }],
    address: userAddressSchema,
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
