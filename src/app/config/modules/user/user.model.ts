import { Schema, model, connect } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const userNameSchema = new Schema<TFullName>({
  firstName: { type: String },
  lastName: { type: String },
});

const userAddressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
  address: userAddressSchema,
});

const User = model<TUser>('User');
