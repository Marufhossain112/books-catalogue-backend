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
exports.AuthService = void 0
const http_status_1 = __importDefault(require('http-status'))
const user_model_1 = require('../user/user.model')
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const jwtHelpers_1 = require('../../../helpers/jwtHelpers')
const config_1 = __importDefault(require('../../../config'))
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload
    // check user
    const isUserExist = yield user_model_1.User.isUserExist(email)
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User not found.',
      )
    }
    // console.log("Paison ni mamu",isUserExist)
    //   //   match password
    const passCheck = yield user_model_1.User.isPasswordMatch(
      password,
      isUserExist.password,
    )
    // console.log('passchecking', passCheck)
    if (!passCheck) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password did not match',
      )
    }
    //   // create access token & refresh token
    const { email: emailId } = isUserExist
    // console.log('emailId', emailId)
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { emailId },
      config_1.default.jwt.token,
      config_1.default.jwt.token_expires,
    )
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { emailId },
      config_1.default.jwt.refresh_token,
      config_1.default.jwt.refresh_expires_in,
    )
    // console.log('refreshToken', refreshToken)
    //   // console.log(accessToken, refreshToken, needsPasswordChange);
    return {
      accessToken,
      refreshToken,
    }
  })
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifiedToken(
        token,
        config_1.default.jwt.refresh_token,
      )
    } catch (err) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token',
      )
    }
    // console.log('verifiedToken',verifiedToken);
    const { emailId } = verifiedToken
    // if user exist
    const isUserExist = yield user_model_1.User.isUserExist(emailId)
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User not found',
      )
    }
    // create new token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        email: isUserExist.email,
      },
      config_1.default.jwt.token,
      config_1.default.jwt.token_expires,
    )
    return {
      accessToken: accessToken,
    }
  })
exports.AuthService = {
  loginUser,
  refreshToken,
}
