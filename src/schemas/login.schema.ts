import { z } from 'zod'

export const loginSchema = z.object({
  usernameOrEmail: z.string({
    required_error: 'Username/Email is required',
    invalid_type_error: 'Username/Email must be a string',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

export type TLoginSchema = z.infer<typeof loginSchema>
