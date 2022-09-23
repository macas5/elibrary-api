import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Number,
    },
    imageLink: {
      type: String,
    },
    form: {
      type: String,
    },
    language: {
      type: String,
    },
    isReleased: {
      type: Boolean,
      default: true,
    },
    isReadableOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('book', bookSchema);
