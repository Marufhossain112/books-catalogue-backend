import { z } from 'zod'
const addReviewZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    body: z.string({ required_error: 'Body is required' }),
    rating: z.number({ required_error: 'Rating is required' }),
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
})

export const ReviewValidation = {
  addReviewZodSchema,
}
