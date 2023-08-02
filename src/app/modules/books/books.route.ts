import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidation } from './books.validation'
import { BookController } from './books.controller'

const router = express.Router()
router.post(
  '/new-book',
  validateRequest(BookValidation.booksZodSchema),
  BookController.newBook,
)
router.get('/all-books', BookController.getAllBooks)
router.get('/:id', BookController.getSingleBook)

export const BooksRoutes = router
