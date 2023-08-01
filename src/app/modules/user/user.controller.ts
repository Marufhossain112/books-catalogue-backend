import { Request, Response } from 'express'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsynch'
const signupUser = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await UserService.signupUser(data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User sign up successfully',
    data: result,
  })
  // next();
})

export const UserController = {
  signupUser,
}
