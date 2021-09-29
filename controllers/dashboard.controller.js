const Book = require("../models/book.model");

module.exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    res.render("dashboard", {
      books,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
