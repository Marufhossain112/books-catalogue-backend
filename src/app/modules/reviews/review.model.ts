import mongoose, { Schema } from 'mongoose'
// Review model
const reviewSchema = new mongoose.Schema({
  title: String,
  body: String,
  rating: String,
  author: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
})
export const Review = mongoose.model('Review', reviewSchema)
