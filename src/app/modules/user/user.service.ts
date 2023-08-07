import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const signupUser = async (user: IUser) => {
  //   const result = await User.create(user)
  //   console.log('user paiso ni', result)
  //   return result
  // console.log('user deho', user)
  // console.log(typeof user.email)
  const isUserExist = await User.isUserExist(user.email)
  // console.log(isUserExist)
  if (!isUserExist) {
    const newUser = await User.create(user)
    return newUser
  } else {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User already exist')
  }
}

export const UserService = {
  signupUser,
}
