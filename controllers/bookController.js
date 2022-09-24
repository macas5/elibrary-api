import bookModel from '../models/bookModel.js';

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookModel.find();
    res.status(202).json(allBooks);
  } catch (error) {
    console.error(error);
  }
};

export const getByCondition = async (req, res) => {
  try {
    const filteredBooks = await bookModel.find({
      title: new RegExp(req.body.searchQuery, 'i'),
    });
    res.status(202).json(filteredBooks);
  } catch (error) {
    console.error(error);
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = new bookModel({
      ...req.body,
    });
    await newBook.save();
    res.status(201).send('New Book is created');
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).send(`Book titled ${book.title} has been deleted`);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const updateBookById = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};
