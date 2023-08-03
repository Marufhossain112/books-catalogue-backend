"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/reviews/:id', review_controller_1.ReviewController.getReview);
router.post('/reviews', auth_1.default, (0, validateRequest_1.default)(review_validation_1.ReviewValidation.addReviewZodSchema), review_controller_1.ReviewController.addReview);
exports.ReviewsRoutes = router;
