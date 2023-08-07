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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthController = void 0
const http_status_1 = __importDefault(require('http-status'))
const auth_service_1 = require('./auth.service')
const catchAsynch_1 = __importDefault(require('../../../shared/catchAsynch'))
const config_1 = __importDefault(require('../../../config'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const loginUser = (0, catchAsynch_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.cookies, 'cookie');
    const loginData = __rest(req.body, [])
    const result = yield auth_service_1.AuthService.loginUser(loginData)
    const { refreshToken } = result,
      others = __rest(
        result,
        // set refresh token on cookie
        ['refreshToken'],
      )
    // set refresh token on cookie
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Login  successfully',
      data: others,
    })
  }),
)
const refreshToken = (0, catchAsynch_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = yield auth_service_1.AuthService.refreshToken(refreshToken)
    // set refresh token on cookie
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Loggedin  successfully',
    })
  }),
)
const logout = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('cookie', '', {
      expires: new Date(Date.now()),
    })
    return res.status(200).json({ message: 'User Logout Successfully' })
  })
exports.AuthController = {
  loginUser,
  refreshToken,
  logout,
}
