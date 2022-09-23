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
      type: String,
      default: 'true',
    },
    isReadableOnline: {
      type: String,
      default: 'false',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('book', bookSchema);
