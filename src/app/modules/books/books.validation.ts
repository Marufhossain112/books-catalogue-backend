import { z } from 'zod'
const createBooksZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    publicationYear: z.string({
      required_error: 'Publication year is required',
    }),
    reviews: z.string().array().optional(),
  }),
})
const updateBooksZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    author: z.string({ required_error: 'Author is required' }).optional(),
    genre: z.string({ required_error: 'Genre is required' }).optional(),
    publicationYear: z
      .string({
        required_error: 'Publication year is required',
      })
      .optional(),
    reviews: z.string().array().optional(),
  }),
})

export const BookValidation = {
  createBooksZodSchema,
  updateBooksZodSchema,
}
