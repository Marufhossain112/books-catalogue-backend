import { Model } from 'mongoose'
import { IReview } from '../reviews/review.interface'

export type IBook = {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: string
  reviews?: IReview[]
}
export type IBookFilters = {
  searchTerm?: string
  genre?: string
  publicationYear?: string
}

export type BookModel = {
  isBookExist(
    id: string,
  ): Promise<Pick<IBook, 'title' | 'author' | 'genre' | 'publicationYear'>>
} & Model<IBook>
