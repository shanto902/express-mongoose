import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
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

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).exec();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
};
