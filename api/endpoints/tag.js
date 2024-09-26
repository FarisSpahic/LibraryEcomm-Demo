const express = require("express");
const Tag = require("../models/tag"); // Adjust the path based on your project structure
const cors = require("cors");
const BookTags = require("../models/booktags");

const router = express.Router();

// Enable CORS for all routes in this router
router.use(cors());

// Preflight handling for the POST route
router.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  res.sendStatus(204); // No Content
});

// POST /tags - Create a new tag
router.post("/", async (req, res) => {
  try {
    const { tag } = req.body;

    // Validate tag input
    if (!tag || typeof tag !== "string") {
      return res.status(400).json({ error: "Tag is required and must be a string" });
    }

    // Create tag object
    const tagObject = {
      name: tag,
    };

    console.log("Trying to upload this object to tags: ", tagObject);
    const newTag = await Tag.create(tagObject);
    console.log("Tag created: ", newTag);

    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a tag..." });
  }
});

// GET /tags - Retrieve all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving tags..." });
  }
});


router.post("/booktag", async (req, res) => {
    try {
        const { tagId, bookId } = req.body;
        const tags = await BookTags.create({
            tagId: tagId,
            bookId: bookId
        });
        res.status(201).json(tags);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving tags..." });
      }
});

module.exports = router;
