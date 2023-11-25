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
exports.UserController = exports.getTotalPrice = exports.getUserOrders = exports.addOrderToUser = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParsedData = user_validation_1.userValidationSchema.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const parsedUserId = parseInt(userId, 10);
        const result = yield user_service_1.UserServices.getSingleUserFromDB(parsedUserId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { userId } = req.params;
        const parsedUserId = parseInt(userId, 10);
        // Here Validating Data Using Zod
        const zodParsedData = user_validation_1.userValidationSchema.parse(user);
        const result = yield user_service_1.UserServices.updateSingleUserFromDB(parsedUserId, zodParsedData);
        if (result === null) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
const addOrderToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { productName, price, quantity } = req.body;
        const parsedUserId = parseInt(userId, 10);
        const orderData = user_validation_1.addProductValidationSchema.parse({
            productName,
            price,
            quantity,
        });
        yield user_service_1.UserServices.addUserOrder(parsedUserId, orderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
exports.addOrderToUser = addOrderToUser;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const parsedUserId = parseInt(userId, 10);
        const result = yield user_service_1.UserServices.getUserOrders(parsedUserId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
exports.getUserOrders = getUserOrders;
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const parsedUserId = parseInt(userId, 10);
        const result = yield user_service_1.UserServices.calculateTotalPrice(parsedUserId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: result },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        handleErrorResponse(error, res);
    }
});
exports.getTotalPrice = getTotalPrice;
const handleErrorResponse = (error, res) => {
    if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = error.errors.map((err) => ({
            code: 'invalid_type',
            expected: err.kind,
            received: typeof err.value,
            path: err.path,
            message: `Expected ${err.kind}, received ${typeof err.value}`,
        }));
        res.status(400).json({
            success: false,
            message: 'Validation error',
            error: validationErrors,
        });
    }
    else if (error.message === 'User not found') {
        // Handle user not found error
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
    else {
        // Handle other errors with a generic error response
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    addOrderToUser: exports.addOrderToUser,
    getUserOrders: exports.getUserOrders,
    getTotalPrice: exports.getTotalPrice,
};
