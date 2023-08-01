import { Model } from 'mongoose'
export type Username = {
  firstName: string
  middleName: string
  lastName: string
}
export type IUser = {
  password: string
  name: Username
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
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
