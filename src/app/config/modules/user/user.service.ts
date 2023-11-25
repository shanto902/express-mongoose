import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser): Promise<TUser> => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error(`User Already Exists`);
  }
  const result = await UserModel.create(user);
  return result;
};

const getUsersFromDB = async () => {
  const result = await UserModel.find().select({
    userId: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number): Promise<TUser | null> => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOne({ userId }).exec();
    return result;
  } else {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
};

const updateSingleUserFromDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
};
export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
