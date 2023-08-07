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
exports.ReviewController = void 0
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const http_status_1 = __importDefault(require('http-status'))
const catchAsynch_1 = __importDefault(require('../../../shared/catchAsynch'))
const review_service_1 = require('./review.service')
// add review
const addReview = (0, catchAsynch_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = __rest(req.body, [])
    const result = yield review_service_1.ReviewService.addReview(reviewData)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Review created successfully',
      data: result,
    })
  }),
)
// get reviews
const getReview = (0, catchAsynch_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params
    const result = yield yield review_service_1.ReviewService.getReview(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Review retrived successfully',
      data: result,
    })
  }),
)
exports.ReviewController = {
  addReview,
  getReview,
}
