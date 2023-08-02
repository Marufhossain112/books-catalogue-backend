import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsynch'
import { BookService } from './books.service'
const newBook = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await BookService.newBook(data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New book created successfully',
    data: result,
  })
  // next();
})

export const BookController = {
  newBook,
}
