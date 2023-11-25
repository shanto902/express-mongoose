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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const __1 = __importDefault(require("../.."));
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
const orderSchema = new mongoose_1.Schema({
    productName: String,
    price: Number,
    quantity: Number,
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
    orders: [orderSchema],
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(__1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        next();
    });
});
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModel.findOne({ userId });
        return existingUser;
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
