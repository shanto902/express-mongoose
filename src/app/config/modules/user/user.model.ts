import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, TUserModel } from './user.interface';

const userNameSchema = new Schema<TFullName>({
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

const userAddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street Required'] },
  city: { type: String, required: [true, 'City Required'] },
  country: { type: String, required: [true, 'Country Required'] },
});

const userSchema = new Schema<TUser, TUserModel>({
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

// userSchema.methods.isUserExists = async function (userId: number) {
//   const existingUser = await UserModel.findOne({ userId });
//   return existingUser;
// };

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<TUser, TUserModel>('User', userSchema);
