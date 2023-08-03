import express from 'express'
import { ReviewController } from './review.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'

const router = express.Router()
router.get('/reviews/:id', ReviewController.getReview)
router.post(
  '/reviews',
  validateRequest(ReviewValidation.addReviewZodSchema),
  ReviewController.addReview,
)

export const ReviewsRoutes = router
