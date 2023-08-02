import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidation } from './books.validation'
import { BookController } from './books.controller'

const router = express.Router()
router.post(
  '/new-book',
  validateRequest(BookValidation.createBooksZodSchema),
  BookController.newBook,
)
router.get('/:id', BookController.getSingleBook)
router.get('/', BookController.getAllBooks)
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBooksZodSchema),
  BookController.editBook,
)
export const BooksRoutes = router
