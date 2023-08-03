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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBookId = void 0;
const books_model_1 = require("./books.model");
const findLastBookId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBook = yield books_model_1.Book.findOne().sort({ createdAt: -1 }).lean();
    // eslint-disable-next-line no-undefined
    console.log('lastBook', lastBook);
    return lastBook === null || lastBook === void 0 ? void 0 : lastBook.id;
});
const generateBookId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastBookId()) || '0'.toString().padStart(5, '0');
    console.log('currentId', currentId);
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    console.log(incrementedId, 'increamenteeId');
    return incrementedId;
});
exports.generateBookId = generateBookId;
