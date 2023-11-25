import { TOrders, TUser } from './user.interface';
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
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number): Promise<TUser | null> => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOne({ userId }).select({
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      hobbies: 1,
      address: 1,
    });
    return result;
  } else {
    const error = new Error('User not found');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = 404;
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  await UserModel.deleteOne({ userId });

  return null;
};

export const addUserOrder = async (
  userId: number,
  orderData: { productName: string; price: number; quantity: number },
) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.orders) {
    user.orders = [] as Array<TOrders>;
  } else {
    user?.orders.push(orderData);
    await user.save();
  }

  return null;
};

export const getUserOrders = async (userId: number) => {
  const user = await UserModel.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }
  return user.orders || [];
};

export const calculateTotalPrice = async (userId: number) => {
  const orders = await getUserOrders(userId);
  const totalPrice = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0,
  );
  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  addUserOrder,
  getUserOrders,
  calculateTotalPrice,
  deleteUser,
};
