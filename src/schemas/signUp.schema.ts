import { z } from 'zod'

export const signUpSchema = z
  .object({
    usernameOrEmail: z
      .string({
        required_error: 'Username/Email is required',
        invalid_type_error: 'Username/Email must be a string',
      })
      .min(3, 'Username/Email must be at least 3 characters')
      .max(255),
    role: z
      .string({
        required_error: 'role is defined per dafault',
      })
    ,
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(3, 'Name must be at least 3 characters')
      .max(255),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(2, 'Password must be at least 2 characters')
      .max(255),
    confirmPassword: z
      .string({
        required_error: 'ConfirmPassword is required',
        invalid_type_error: 'ConfirmPassword must be a string',
      })
      .min(2, 'Password must be at least 2 characters')
      .max(255),
    terms: z
      .boolean({
        required_error: 'You must accept the terms and conditions',
        invalid_type_error: 'You must accept the terms and conditions',
      })
      .refine(val => val === true, {
        message: 'You must accept the terms and conditions',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
