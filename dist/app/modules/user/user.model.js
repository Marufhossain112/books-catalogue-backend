'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.User = void 0
const mongoose_1 = require('mongoose')
const bcrypt_1 = __importDefault(require('bcrypt'))
const config_1 = __importDefault(require('../../../config'))
const common_1 = require('../../../shared/common')
// And a schema that knows about IUserMethods
const userSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: common_1.gender,
    },
    bloodGroup: {
      type: String,
      enum: common_1.bloodGroup,
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
userSchema.statics.isUserExist = function (email) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield exports.User.findOne({ email }, { email: 1, password: 1 })
  })
}
userSchema.statics.isPasswordMatch = function (givenPassword, savedPassword) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(givenPassword, savedPassword)
  })
}
userSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    // console.log(this);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bcrypt_salt_rounds),
    )
    next()
  })
})
exports.User = (0, mongoose_1.model)('User', userSchema)
