'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.BookValidation = void 0
const zod_1 = require('zod')
const createBooksZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required' }),
    author: zod_1.z.string({ required_error: 'Author is required' }),
    genre: zod_1.z.string({ required_error: 'Genre is required' }),
    publicationYear: zod_1.z.string({
      required_error: 'Publication year is required',
    }),
    imgUrl: zod_1.z.string().optional(),
    reviews: zod_1.z.string().array().optional(),
  }),
})
const updateBooksZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
    author: zod_1.z.string({ required_error: 'Author is required' }).optional(),
    genre: zod_1.z.string({ required_error: 'Genre is required' }).optional(),
    publicationYear: zod_1.z
      .string({
        required_error: 'Publication year is required',
      })
      .optional(),
    imgUrl: zod_1.z.string().optional(),
    reviews: zod_1.z.string().array().optional(),
  }),
})
exports.BookValidation = {
  createBooksZodSchema,
  updateBooksZodSchema,
}
