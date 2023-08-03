import { jwtHelpers } from './../../../src/helpers/jwtHelpers'
import { NextFunction, Request, Response } from 'express'
import ApiError from '../../../src/errors/ApiError'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../src/config'
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.')
    }
    //   verify token
    let verifiedUser = null
    verifiedUser = jwtHelpers.verifiedToken(token, config.jwt.token as Secret)
    req.email = verifiedUser

    console.log('Hello', verifiedUser)
    next()
  } catch (error) {
    next(error)
  }
}
export default auth
