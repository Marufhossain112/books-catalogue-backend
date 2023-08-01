import httpStatus from 'http-status'

import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface'

import { Secret } from 'jsonwebtoken'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { email, password } = payload

  // check user
  const isUserExist = await User.isUserExist(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.')
  }
  // console.log("Paison ni mamu",isUserExist)
  //   //   match password

  const passCheck = await User.isPasswordMatch(password, isUserExist.password)
  // console.log('passchecking', passCheck)
  if (!passCheck) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not match')
  }
  //   // create access token & refresh token
  const { email: emailId } = isUserExist
  // console.log('emailId', emailId)
  const accessToken = jwtHelpers.createToken(
    { emailId },
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { emailId },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires_in as string,
  )
  // console.log('refreshToken', refreshToken)

  //   // console.log(accessToken, refreshToken, needsPasswordChange);

  return {
    accessToken,
    refreshToken,
  }
}
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_token as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  // console.log('verifiedToken',verifiedToken);
  const { emailId } = verifiedToken
  // if user exist

  const isUserExist = await User.isUserExist(emailId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  // create new token
  const accessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
    },
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  )
  return {
    accessToken: accessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
