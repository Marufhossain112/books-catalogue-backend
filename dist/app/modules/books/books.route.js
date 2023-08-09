'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BooksRoutes = void 0
const express_1 = __importDefault(require('express'))
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const books_validation_1 = require('./books.validation')
const books_controller_1 = require('./books.controller')
const router = express_1.default.Router()
router.post(
  '/new-book',
  (0, validateRequest_1.default)(
    books_validation_1.BookValidation.createBooksZodSchema,
  ),
  books_controller_1.BookController.newBook,
)
router.get('/all-books', books_controller_1.BookController.getAllBooks)
// router.get('/latest-books', BookController.getLatestBooks)
router.get('/:id', books_controller_1.BookController.getSingleBook)
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    books_validation_1.BookValidation.updateBooksZodSchema,
  ),
  books_controller_1.BookController.editBook,
)
router.delete('/:id', books_controller_1.BookController.deleteBook)
exports.BooksRoutes = router
