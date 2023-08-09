import mongoose, { Schema } from 'mongoose'
// Review model
export const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  body: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  author: { type: String, required: true },
})
export const Review = mongoose.model('Review', reviewSchema)
