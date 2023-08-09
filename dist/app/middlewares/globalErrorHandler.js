'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const zod_1 = require('zod')
const config_1 = __importDefault(require('../../config'))
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError'),
)
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError'),
)
const handleZodError_1 = require('../../errors/handleZodError')
const ApiError_1 = __importDefault(require('../../errors/ApiError'))
const globalErrorHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  config_1.default.env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.log('globalErrorHandler', error)
  let statusCode = 400
  let message = 'Something went wrong'
  let errorMessages = []
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplifiedError = (0, handleValidationError_1.default)(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    // res.status(200).json({ error });
    const simplifiedError = (0, handleCastError_1.default)(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.handleZodError)(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError_1.default) {
    statusCode = error.statusCode
    message = error === null || error === void 0 ? void 0 : error.message
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error === null || error === void 0 ? void 0 : error.message
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config_1.default.env !== 'production' ? error.stack : undefined,
  })
}
exports.default = globalErrorHandler
