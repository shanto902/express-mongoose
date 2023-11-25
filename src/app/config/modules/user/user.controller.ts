import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
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
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
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
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Something went wrong';

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: {
        code: statusCode,
        description: errorMessage,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);
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
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Something went wrong';

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: {
        code: statusCode,
        description: errorMessage,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
