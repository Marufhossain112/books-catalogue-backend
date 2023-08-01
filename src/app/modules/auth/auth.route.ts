import express from 'express'

import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
)
export const AuthRoutes = router
