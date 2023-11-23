"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name Required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name Required'],
        trim: true,
    },
});
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, 'Street Required'] },
    city: { type: String, required: [true, 'City Required'] },
    country: { type: String, required: [true, 'Country Required'] },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true },
    username: {
        type: String,
        required: [true, 'Username Required'],
        unique: true,
        trim: true,
    },
    password: { type: String, required: [true, 'Password Required'], trim: true },
    fullName: {
        type: userNameSchema,
        required: [true, 'Full Name Required'],
    },
    age: { type: Number, required: [true, 'Age Required'] },
    email: {
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        trim: true,
    },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: {
        type: userAddressSchema,
        required: [true, 'Address Required'],
    },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
