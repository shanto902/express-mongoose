import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  TUserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../..';
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

const orderSchema = new Schema<TOrders>({
  productName: String,
  price: Number,
  quantity: Number,
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
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('findOneAndUpdate', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.post('find', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<TUser, TUserModel>('User', userSchema);
