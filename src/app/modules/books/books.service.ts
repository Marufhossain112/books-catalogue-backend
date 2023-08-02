import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBook } from './books.interface'
import { Book } from './books.model'
import { generateBookId } from './book.utils'

const newBook = async (book: IBook) => {
  const id = await generateBookId()
  // console.log('id koto', id)
  book.id = id
  // console.log('book', book)
  const isBookExist = await Book.isBookExist(id)
  // console.log(isBookExist)
  if (!isBookExist) {
    const newBook = await Book.create(book)
    return newBook
  } else {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Book exist')
  }
}

export const BookService = {
  newBook,
}
