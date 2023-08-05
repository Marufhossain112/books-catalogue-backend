import { Model } from 'mongoose'
export type Username = {
  firstName: string
  middleName: string
  lastName: string
}
export type IUser = {
  name: Username
  email: string
  password: string
  gender: 'male' | 'female'
  contactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  profileImage?: string
}

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
