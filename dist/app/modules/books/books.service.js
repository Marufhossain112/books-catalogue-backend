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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_model_1 = require("./books.model");
const books_utils_1 = require("./books.utils");
const books_constants_1 = require("./books.constants");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
// add new books
const newBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, books_utils_1.generateBookId)();
    // console.log('id koto', id)
    book.id = id;
    // console.log('book', book)
    const isBookExist = yield books_model_1.Book.isBookExist(id);
    // console.log(isBookExist)
    if (!isBookExist) {
        const newBook = yield books_model_1.Book.create(book);
        return newBook;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Book exist');
    }
});
// getAllBooks
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constants_1.BookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // console.log('filtersData key', Object.entries(filtersData));
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortItems = {};
    if (sortBy && sortOrder) {
        sortItems[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // const allBooks = await Book.find({})
    const result = yield books_model_1.Book.find(whereConditions)
        .sort(sortItems)
        .skip(skip)
        .limit(limit);
    const total = yield books_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// // get latest books
// const getLatestBooks = async (
//   filters: IBookFilters,
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<IBook[]>> => {
//   const { searchTerm, ...filtersData } = filters
//   const andConditions = []
//   if (searchTerm) {
//     andConditions.push({
//       $or: BookSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     })
//   }
//   // console.log('filtersData key', Object.entries(filtersData));
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     })
//   }
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions)
//   const sortItems: { [key: string]: SortOrder } = {}
//   if (sortBy && sortOrder) {
//     sortItems[sortBy] = sortOrder
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {}
//   const result = await Book.find(whereConditions)
//     .sort(sortItems)
//     .skip(skip)
//     .limit(10)
//   const total = await Book.countDocuments(whereConditions)
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   }
// }
// get single book
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findById(id);
    return result;
});
// edit book
const editBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Book.findOne({ _id: id });
    // console.log('boi paiso mama', isExist)
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found.');
    }
    const bookData = __rest(payload, []);
    const editedBookData = Object.assign({}, bookData);
    const result = yield books_model_1.Book.findOneAndUpdate({ _id: id }, editedBookData, {
        new: true,
    });
    return result;
});
// delete book
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findByIdAndDelete({ _id: id });
    return result;
});
exports.BookService = {
    newBook,
    getAllBooks,
    // getLatestBooks,
    getSingleBook,
    editBook,
    deleteBook,
};
