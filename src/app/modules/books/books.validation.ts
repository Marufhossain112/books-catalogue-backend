import { z } from 'zod'
const booksZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    publicationYear: z.string({
      required_error: 'Publication date is required',
    }),
  }),
})

export const BookValidation = {
  booksZodSchema,
}
