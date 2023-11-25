import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(1)
    .max(255),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(1)
    .max(255),
});

const addressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }).min(1).max(255),
  city: z.string({ required_error: 'City is required' }).min(1).max(255),
  country: z.string({ required_error: 'Country is required' }).min(1).max(255),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema,
});

export const updateUserValidationSchema = z.object({
  username: z.string().min(1).max(255).optional(),
  password: z.string().min(1).max(255).optional(),
  fullName: fullNameValidationSchema.optional(),
  age: z.number().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema.optional(),
});

export const addProductValidationSchema = z.object({
  productName: z.string().min(1).max(255),
  price: z.number(),
  quantity: z.number(),
});
