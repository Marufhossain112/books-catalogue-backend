import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './books.interface'
import { reviewSchema } from '../reviews/review.model'

// And a schema that knows about IUserMethods
const bookSchema = new Schema<IBook, BookModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    publisherToken: {
      type: String,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

bookSchema.statics.isBookExist = async function (
  id: string,
): Promise<Pick<
  IBook,
  'title' | 'author' | 'genre' | 'publicationYear'
> | null> {
  return await Book.findOne(
    { id },
    { title: 1, author: 1, genre: 1, publicationYear: 1 },
  )
}

export const Book = model<IBook, BookModel>('Book', bookSchema)
