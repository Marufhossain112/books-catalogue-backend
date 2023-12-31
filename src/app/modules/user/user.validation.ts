import { z } from 'zod'
import { bloodGroup, gender } from '../../../shared/common'
const signUpUserZodSchema = z.object({
  body: z.object({
    password: z.string(),
    name: z.string({
      required_error: 'Name is required.',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required.',
    }),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string({ required_error: 'Email is required' }),
    contactNo: z.string({
      required_error: 'Contact number is required.',
    }),
    presentAddress: z.string({
      required_error: 'Present address is required.',
    }),
    profileImage: z.string().optional(),
  }),
})

export const UserValidation = {
  signUpUserZodSchema,
}
