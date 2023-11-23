import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const userNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First Name Required'] },
  lastName: { type: String, required: [true, 'Last Name Required'] },
});

const userAddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street Required'] },
  city: { type: String, required: [true, 'City Required'] },
  country: { type: String, required: [true, 'Country Required'] },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: {
    type: String,
    required: [true, 'Username Required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password Required'] },
  fullName: {
    type: userNameSchema,
    required: [true, 'Full Name Required'],
  },
  age: { type: Number, required: [true, 'Age Required'] },
  email: { type: String, required: [true, 'Email Required'], unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: {
    type: userAddressSchema,
    required: [true, 'Address Required'],
  },
});

export const UserModel = model<TUser>('User', userSchema);
