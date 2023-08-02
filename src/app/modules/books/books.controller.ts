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
  // console.log('resulttttt', result)
  // eslint-disable-next-line no-console
  // console.log('reeeesulllt', result)
  // console.log(paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result.data,
  })
})

export const BookController = {
  newBook,
  getAllBooks,
}
