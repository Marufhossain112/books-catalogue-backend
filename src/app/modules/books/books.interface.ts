import { Model } from 'mongoose'

export type IBook = {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: string
}

export type BookModel = {
  isBookExist(
    id: string,
  ): Promise<Pick<IBook, 'title' | 'author' | 'genre' | 'publicationYear'>>
} & Model<IBook>
