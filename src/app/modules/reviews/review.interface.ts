import { Types } from 'mongoose'
import { IBook } from '../books/books.interface'

export type IReview = {
  title: string
  body: string
  rating: string
  author: string
  book: Types.ObjectId | IBook
}
