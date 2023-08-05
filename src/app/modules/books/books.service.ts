/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBook, IBookFilters } from './books.interface'
import { Book } from './books.model'
import { generateBookId } from './books.utils'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { BookSearchableFields } from './books.constants'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

// add new books
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
// getAllBooks
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // console.log('filtersData key', Object.entries(filtersData));
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortItems: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortItems[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const allBooks = await Book.find({})
  const result = await Book.find(whereConditions)
    .sort(sortItems)
    .skip(skip)
    .limit(allBooks.length)
  const total = await Book.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
// get latest books
const getLatestBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // console.log('filtersData key', Object.entries(filtersData));
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortItems: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortItems[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Book.find(whereConditions)
    .sort(sortItems)
    .skip(skip)
    .limit(10)
  const total = await Book.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
// get single book
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
  return result
}
// edit book
const editBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id })
  // console.log('boi paiso mama', isExist)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.')
  }
  const { ...bookData } = payload
  const editedBookData: Partial<IBook> = { ...bookData }

  const result = await Book.findOneAndUpdate({ _id: id }, editedBookData, {
    new: true,
  })
  return result
}
// delete book
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete({ _id: id })
  return result
}
export const BookService = {
  newBook,
  getAllBooks,
  getLatestBooks,
  getSingleBook,
  editBook,
  deleteBook,
}
