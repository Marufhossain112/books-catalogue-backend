import express from 'express'
import { UserRoutes } from '../app/modules/user/user.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'
import { BooksRoutes } from '../app/modules/books/books.route'
import { ReviewsRoutes } from '../app/modules/reviews/review.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BooksRoutes,
  },
  {
    path: '/api',
    route: ReviewsRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
