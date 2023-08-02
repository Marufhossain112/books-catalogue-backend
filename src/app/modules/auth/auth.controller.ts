import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { ILoginResponse, IRefreshTokenResponse } from './auth.interface'
import catchAsync from '../../../shared/catchAsynch'
import config from '../../../config'
import sendResponse from '../../../shared/sendResponse'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.cookies, 'cookie');
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refresh token on cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login  successfully',
    data: others,
  })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await AuthService.refreshToken(refreshToken)
  // set refresh token on cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loggedin  successfully',
  })
})
const logout = async (req: Request, res: Response) => {
  res.cookie('cookie', '', {
    expires: new Date(Date.now()),
  })
  return res.status(200).json({ message: 'User Logout Successfully' })
}

export const AuthController = {
  loginUser,
  refreshToken,
  logout,
}
