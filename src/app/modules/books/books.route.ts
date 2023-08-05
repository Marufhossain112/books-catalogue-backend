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
router.get('/all-books', BookController.getAllBooks)
router.get('/latest-books', BookController.getLatestBooks)
router.get('/:id', BookController.getSingleBook)
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBooksZodSchema),
  BookController.editBook,
)
router.delete('/:id', BookController.deleteBook)
export const BooksRoutes = router
