import { Request, Response } from 'express';
import { UserServices } from './user.service';
import {
  addProductValidationSchema,
  userValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParsedData = userValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);
    const result = await UserServices.getSingleUserFromDB(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);
    // Here Validating Data Using Zod
    const zodParsedData = userValidationSchema.parse(user);

    const result = await UserServices.updateSingleUserFromDB(
      parsedUserId,
      zodParsedData,
    );

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
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);

    await UserServices.deleteUser(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

export const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;
    const parsedUserId = parseInt(userId, 10);

    const orderData = addProductValidationSchema.parse({
      productName,
      price,
      quantity,
    });

    await UserServices.addUserOrder(parsedUserId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);

    const result = await UserServices.getUserOrders(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

export const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const parsedUserId = parseInt(userId, 10);

    const result = await UserServices.calculateTotalPrice(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorResponse(error, res);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrorResponse = (error: any, res: Response) => {
  if (error.name === 'ValidationError') {
    const validationErrors = Array.isArray(error.errors)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.errors.map((err: any) => ({
          code: 'invalid_type',
          expected: err.kind,
          received: typeof err.value,
          path: err.path,
          message: `Expected ${err.kind}, received ${typeof err.value}`,
        }))
      : [];

    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: validationErrors,
    });
  } else if (error.message === 'User not found') {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  addOrderToUser,
  getUserOrders,
  getTotalPrice,
  deleteUser,
};
