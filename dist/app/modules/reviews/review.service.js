"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const review_model_1 = require("./review.model");
const books_model_1 = require("../books/books.model");
// add review
const addReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, body, rating, author, book } = payload;
        const newReview = yield review_model_1.Review.create({
            title,
            rating,
            body,
            book,
            author,
        });
        const bookToUpdate = yield books_model_1.Book.findById(book);
        (_a = bookToUpdate === null || bookToUpdate === void 0 ? void 0 : bookToUpdate.reviews) === null || _a === void 0 ? void 0 : _a.push(newReview);
        yield bookToUpdate.save();
        return newReview;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NO_CONTENT, 'Could not create review');
    }
});
// get review
const getReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_model_1.Review.find({ book: payload });
        return reviews;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NO_CONTENT, 'Could not create review');
    }
});
exports.ReviewService = {
    addReview,
    getReview,
};
