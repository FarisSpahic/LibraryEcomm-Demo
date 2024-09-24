const express = require("express");
const { Op } = require("sequelize");
const multer = require("multer");
const Book = require("../models/book");
const Image = require("../models/image");
const verifyToken = require("../verifyToken");

const router = express.Router();
const upload = multer();

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, searchTerm } = req.query;
  console.log("search term: ", searchTerm);

  const whereCondition = searchTerm
    ? { title: { [Op.iLike]: `${searchTerm}%` } } // Case-insensitive search with 'ILIKE'
    : {}; // Empty condition means no 'WHERE' clause
  try {
    const books = await Book.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      where: whereCondition,
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book." });
  }
});

router.get('/ISBN/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ where: { ISBN: isbn } });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    let image;
    if (req.file && req.file.buffer) {
      image = await Image.create({ imgData: req.file.buffer });
      console.log("Uploaded Image: ", image);
    } else {
      image = { id : null};
    }

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

router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await Book.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book." });
  }
});

module.exports = router;
