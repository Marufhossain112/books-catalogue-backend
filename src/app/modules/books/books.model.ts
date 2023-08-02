import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './books.interface'

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
    publicationDate: {
      type: String,
      required: true,
    },
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
  'title' | 'author' | 'genre' | 'publicationDate'
> | null> {
  return await Book.findOne(
    { id },
    { title: 1, author: 1, genre: 1, publicationDate: 1 },
  )
}

export const Book = model<IBook, BookModel>('Book', bookSchema)
