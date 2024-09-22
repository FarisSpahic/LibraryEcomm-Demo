const express = require("express");
const multer = require("multer");
const Book = require("../models/book");
const Image = require("../models/image");
const verifyToken = require("../verifyToken");

const router = express.Router();
const upload = multer();


router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await Book.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book.' });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {

    const image = await Image.create({ imgData: req.file.buffer });
    console.log("Uploaded Image: ", image);
    
    const { title, author, ISBN, publisher, availability, totalPages, price } =
      req.body;
    console.log("Request body: ", req.body);
    
    const newBook = await Book.create({
      title,
      author,
      ISBN,
      publisher,
      availability: availability === "true",
      totalPages,
      price,
      imageId: image.id,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating book" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Book.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'An error occurred while deleting the book.' });
  }
});

module.exports = router;
