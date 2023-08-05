import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { bloodGroup, gender } from '../../../shared/common'

// And a schema that knows about IUserMethods
const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },

    gender: {
      type: String,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },

    presentAddress: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 })
}

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  // console.log(this);
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
export const User = model<IUser, UserModel>('User', userSchema)
