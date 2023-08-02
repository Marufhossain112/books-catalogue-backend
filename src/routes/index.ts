import express from 'express'
import { UserRoutes } from '../app/modules/user/user.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'
import { BooksRoutes } from '../app/modules/books/books.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
