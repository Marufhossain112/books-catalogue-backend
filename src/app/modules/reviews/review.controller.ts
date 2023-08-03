import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsynch'
import { ReviewService } from './review.service'

// add review
const addReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body
  const result = await (
    await ReviewService.addReview(reviewData)
  ).populate('book')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})
// get reviews
const getReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await await ReviewService.getReview(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrived successfully',
    data: result,
  })
})

export const ReviewController = {
  addReview,
  getReview,
}
