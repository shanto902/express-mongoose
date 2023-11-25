import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser): Promise<TUser> => {
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
  const result = await UserModel.findOne({ userId }).exec();
  return result;
};

const updateSingleUserFromDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
