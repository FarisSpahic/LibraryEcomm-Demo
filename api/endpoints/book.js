const express = require("express");
const { Op, Sequelize } = require("sequelize");
const multer = require("multer");
const Book = require("../models/book");
const Image = require("../models/image");
const verifyToken = require("../verifyToken");
const Order = require("../models/order");
const BookTags = require("../models/booktags");

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


router.get("/recommendations/:id", async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const userId = req.params.id;

  try {
    // Step 1: Get all orders for the user
    const orders = await Order.findAll({
      where: { userId: userId },
    });
    console.log("Orders of the user: ", orders)
    // Extract book IDs from the orders
    const purchasedBookIds = orders.map((order) => order.bookId);

    // Step 2: Get tag IDs for those purchased books
    const tags = await BookTags.findAll({
      where: {
        bookId: {
          [Op.in]: purchasedBookIds,
        },
      },
      attributes: ["tagId"],
    });
    console.log("Tags of the booktags: ", tags)

    // Extract unique tag IDs
    const tagIds = [...new Set(tags.map((tag) => tag.tagId))];
    console.log("TagIDS: ", tagIds)
    const booksWithSameTag = await BookTags.findAll({
      where: {
        tagId: {
          [Op.in]: tagIds,
        },
      },
      attributes: ["bookId"],
    });
    console.log("Got the books with same tag: ", booksWithSameTag)
    // Step 3: Find other books with those tags, excluding purchased books
    const bookIds = [...new Set(booksWithSameTag.map((book) => book.bookId))];
    console.log("Trying to find books with these id's: ", bookIds)
    const recommendedBooks = await Book.findAndCountAll({
      where: {
        id: {
          [Op.in]: bookIds, // Exclude purchased books
        },
      },
    });
    console.log("Recs of the booktags: ", recommendedBooks)

    // Step 4: Return recommended books
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );

    res.json(recommendedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching recommended books" });
  }
});

router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    // Check if the book already has an image
    let image;
    if (book.imageId) {
      // Update the existing image
      image = await Image.findByPk(book.imageId);
      if (!image) {
        return res.status(404).json({ error: "Image not found." });
      }
      image.imgData = req.file.buffer; // Update the image data
      await image.save();
    } else {
      // Create a new image if none exists
      image = await Image.create({ imgData: req.file.buffer });
      book.imageId = image.id;
      await book.save();
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );

    res.json({
      message: "Book image updated successfully.",
      imageId: image.id,
    });
  } catch (error) {
    console.error("Error updating book image:", error);
    res.status(500).json({ error: "Error updating book image." });
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

router.get("/ISBN/:isbn", async (req, res) => {
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
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    let image;
    if (req.file && req.file.buffer) {
      image = await Image.create({ imgData: req.file.buffer });
      console.log("Uploaded Image: ", image);
    } else {
      image = { id: null };
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "864000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
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
