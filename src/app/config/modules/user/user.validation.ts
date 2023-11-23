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

const userValidationSchema = z.object({
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

export default userValidationSchema;
