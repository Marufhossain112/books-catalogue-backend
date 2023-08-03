import express from 'express'
import { ReviewController } from './review.controller'

const router = express.Router()
router.get('/reviews/:id', ReviewController.getReview)
router.post('/reviews', ReviewController.addReview)

export const ReviewsRoutes = router
