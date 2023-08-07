import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsynch'
import { BookService } from './books.service'
import pick from '../../../shared/pick'
import { BookFilterableFields } from './books.constants'
import { paginationFields } from '../../../constants/paginationFields'
import { IBook } from './books.interface'

// add new book
const newBook = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await BookService.newBook(data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New book created successfully',
    data: result,
  })
})
// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields)
  // eslint-disable-next-line no-console
  console.log('filters', filters)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await BookService.getAllBooks(filters, paginationOptions)
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result.data,
  })
})
// // get latest books
// const getLatestBooks = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, BookFilterableFields)
//   // eslint-disable-next-line no-console
//   console.log('filters', filters)
//   const paginationOptions = pick(req.query, paginationFields)
//   const result = await BookService.getLatestBooks(filters, paginationOptions)
//   sendResponse<IBook[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books retrieved successfully',
//     data: result.data,
//   })
// })
// get single book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BookService.getSingleBook(id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  })
})
// edit book
const editBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const editedData = req.body
  const result = await BookService.editBook(id, editedData)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book edited successfully',
    data: result,
  })
})

// delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BookService.deleteBook(id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  })
})

export const BookController = {
  newBook,
  // getLatestBooks,
  getAllBooks,
  getSingleBook,
  editBook,
  deleteBook,
}
