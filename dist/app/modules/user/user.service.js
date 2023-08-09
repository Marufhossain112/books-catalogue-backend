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
exports.UserService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const user_model_1 = require('./user.model')
const signupUser = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await User.create(user)
    //   console.log('user paiso ni', result)
    //   return result
    // console.log('user deho', user)
    // console.log(typeof user.email)
    const isUserExist = yield user_model_1.User.isUserExist(user.email)
    // console.log(isUserExist)
    if (!isUserExist) {
      const newUser = yield user_model_1.User.create(user)
      return newUser
    } else {
      throw new ApiError_1.default(
        http_status_1.default.NOT_ACCEPTABLE,
        'User already exist',
      )
    }
  })
exports.UserService = {
  signupUser,
}
