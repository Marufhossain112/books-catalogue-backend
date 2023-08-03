/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IReview } from './review.interface'
import { Review } from './review.model'
import { Book } from '../books/books.model'

// add review
const addReview = async (payload: IReview) => {
  try {
    const { title, body, rating, author, book } = payload
    const newReview: IReview = await Review.create({
      title,
      rating,
      body,
      book,
      author,
    })
    const bookToUpdate = await Book.findById(book)

    bookToUpdate?.reviews?.push(newReview)
    await bookToUpdate!.save()
    return newReview
  } catch (error) {
    throw new ApiError(httpStatus.NO_CONTENT, 'Could not create review')
  }
}

// get review
const getReview = async (payload: string) => {
  try {
    const reviews = await Review.find({ book: payload })
    return reviews
  } catch (error) {
    throw new ApiError(httpStatus.NO_CONTENT, 'Could not create review')
  }
}
export const ReviewService = {
  addReview,
  getReview,
}
