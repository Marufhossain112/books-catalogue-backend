import { Model } from 'mongoose'

export type ILoginUser = {
  email: string
  password: string
}
export type AuthModel = Model<ILoginUser, Record<string, unknown>>
export type ILoginResponse = {
  refreshToken?: string
  accessToken: string
}
export type IRefreshTokenResponse = {
  accessToken: string
}
