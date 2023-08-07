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
Object.defineProperty(exports, '__esModule', { value: true })
exports.Book = void 0
const mongoose_1 = require('mongoose')
const review_model_1 = require('../reviews/review.model')
// And a schema that knows about IUserMethods
const bookSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    reviews: [review_model_1.reviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
bookSchema.statics.isBookExist = function (id) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield exports.Book.findOne(
      { id },
      { title: 1, author: 1, genre: 1, publicationYear: 1 },
    )
  })
}
exports.Book = (0, mongoose_1.model)('Book', bookSchema)
