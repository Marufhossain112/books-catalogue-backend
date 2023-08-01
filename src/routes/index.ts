import express from 'express'
import { UserRoutes } from '../app/modules/user/user.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
