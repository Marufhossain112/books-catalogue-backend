import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'
const router = express.Router()
router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserZodSchema),
  UserController.signupUser,
)

export const UserRoutes = router
