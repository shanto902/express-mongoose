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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.calculateTotalPrice = exports.getUserOrders = exports.addUserOrder = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(user.userId)) {
        throw new Error(`User Already Exists`);
    }
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select({
        userId: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOne({ userId }).exec();
        return result;
    }
    else {
        const error = new Error('User not found');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.statusCode = 404;
        throw error;
    }
});
const updateSingleUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, userData, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    else {
        const error = new Error('User not found');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.statusCode = 404;
        throw error;
    }
});
const addUserOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.orders) {
        user.orders = [];
    }
    else {
        user === null || user === void 0 ? void 0 : user.orders.push(orderData);
        yield user.save();
    }
    return null;
});
exports.addUserOrder = addUserOrder;
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.orders || [];
});
exports.getUserOrders = getUserOrders;
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, exports.getUserOrders)(userId);
    const totalPrice = orders.reduce((total, order) => total + order.price * order.quantity, 0);
    return totalPrice;
});
exports.calculateTotalPrice = calculateTotalPrice;
exports.UserServices = {
    createUserIntoDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    addUserOrder: exports.addUserOrder,
    getUserOrders: exports.getUserOrders,
    calculateTotalPrice: exports.calculateTotalPrice,
};
